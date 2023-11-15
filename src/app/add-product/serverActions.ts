"use server";
import prismaBase from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString().split(/\s+/);
  const price = Number(formData.get("price") || 0);

  let colorsArray: string[] = [];
  let model;
  let clothesCategory;

  // Check if the product category is not 'misc', then parse the colors and set other optional fields
  const category = formData.get("category")?.toString();
  if (category !== "misc") {
    const colors = formData.get("colors")?.toString();
    colorsArray = colors ? colors.split(/\s+/) : [];
    model = formData.get("modelFilename")?.toString();
    clothesCategory = formData.get("clothesCategory")?.toString();
  }

  //adds to start of array
  colorsArray.unshift("");

  if (
    !name ||
    !description ||
    !imageUrl ||
    !price ||
    !category ||
    (category !== "misc" && (!model || !clothesCategory))
  ) {
    throw Error("Missing required fields");
  }

  await prismaBase.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
      category,
      model, // This will be undefined if category is 'misc'
      clothesCategory, // This will be undefined if category is 'misc'
      colors: colorsArray, // This will be undefined or an empty array if not provided
    },
  });

  redirect("/");
}

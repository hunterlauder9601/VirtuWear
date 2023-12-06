"use server";
import prismaBase from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function protectPath() {
  const session = await getServerSession(authOptions);

  // Check if the user is an admin
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }
}

export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);

  // Check if the user is an admin
  if (!session || session.user.role !== "admin") {
    throw Error("Unauthorized: Only admins can add products");
  }

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

"use server";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  const category = formData.get("category")?.toString();
  const model = formData.get("modelFilename")?.toString();
  const clothesCategory = formData.get("clothesCategory")?.toString();

  if (!name || !description || !imageUrl || !price || !category || !model) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price, category, model, clothesCategory },
  });

  redirect("/");
}



import React from "react";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";

export const metadata = {
  title: "Add Product - Company",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export const page = () => {
  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <h1 className="mb-6 text-3xl font-bold tracking-wider">Add Product</h1>
      <form
        action={addProduct}
        className="flex w-full max-w-4xl flex-col items-center px-6 shadow-2xl"
      >
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-4 w-full bg-neutral text-lg"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />
        <button className="ccButtonMain">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;

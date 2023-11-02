import React from "react";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../../components/FormSubmitButton";

export const metadata = {
  title: "Add Product - Company",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  const category = formData.get("category")?.toString();
  const model = formData.get("modelFilename")?.toString();


  if (!name || !description || !imageUrl || !price || !category || !model) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price, category, model },
  });

  redirect("/");
}

export const page = () => {
  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <h1 className="mb-6 text-3xl font-bold tracking-wider mt-[64px]">Add Product</h1>
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
          name="modelFilename"
          placeholder="Model Filename"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />

        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />

        <div className="mb-4 flex items-center gap-4 self-start">
          <h2 className="">Category:</h2>
          <select name="category" className="select select-bordered" defaultValue="men">
            <option value="men">
              Men
            </option>
            <option value="women">Women</option>
            <option value="misc">Misc</option>
          </select>
        </div>
        <FormSubmitButton className="ccButtonMain">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default page;

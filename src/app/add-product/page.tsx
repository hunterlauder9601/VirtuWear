"use client";
import { ChangeEvent, useState } from "react";
import { addProduct } from "@/app/add-product/serverActions";
import FormSubmitButton from "../../components/FormSubmitButton";

export const Page = () => {
  const [isClothes, setIsClothes] = useState(true);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsClothes(event.target.value !== "misc");
  };

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <h1 className="mb-6 mt-[64px] text-3xl font-bold tracking-wider">
        Add Product
      </h1>
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
          placeholder="Image URL(s) (separate by spaces)"
          type="url"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />

        <div className="mb-4 flex items-center gap-4 self-start">
          <h2 className="">Category:</h2>
          <select
            name="category"
            className="select select-bordered"
            defaultValue="men"
            onChange={handleCategoryChange}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="misc">Misc</option>
          </select>
        </div>
        {isClothes && (
          <>
            <div className="mb-4 flex items-center gap-4 self-start">
              <h2 className="">Clothes Category:</h2>
              <select
                name="clothesCategory"
                className="select select-bordered"
                defaultValue="head"
              >
                <option value="head">Head</option>
                <option value="glasses">Glasses</option>
                <option value="torso">Torso</option>
                <option value="legs">Legs</option>
                <option value="feet">Feet</option>
              </select>
            </div>
            <input
              required
              name="modelFilename"
              placeholder="Model Identifier (1 to n)"
              className="input input-bordered mb-4 w-full bg-neutral text-lg"
            />
            <input
              name="colors"
              placeholder="HEX Color Option(s) (separate by spaces)"
              className="input input-bordered mb-4 w-full bg-neutral text-lg"
            />
          </>
        )}

        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-4 w-full bg-neutral text-lg"
        />

        <FormSubmitButton className="ccButtonMain">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default Page;

"use client";

import { ColorBox } from "@/app/customizer/Configurator";
import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  colors: string[];
  incrementProductQuantity: (productId: string, selectedColor: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  colors,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <h1 className="text-xl font-bold tracking-wider">Color Options:</h1>
      <div className="mt-4 mb-8 grid gap-2 grid-cols-4 w-1/2 justify-items-center">
        {colors?.map((color) => (
          <ColorBox
            key={color}
            color={color}
            selectedColor={selectedColor}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="btn ccButtonMain"
          onClick={() => {
            setSuccess(false);
            startTransition(async () => {
              await incrementProductQuantity(productId, selectedColor);
              setSuccess(true);
            });
          }}
        >
          Add to Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
        {isPending && <span className="loading loading-spinner loading-md" />}
        {!isPending && success && (
          <span className="text-info">Added to Cart!</span>
        )}
      </div>
    </>
  );
}

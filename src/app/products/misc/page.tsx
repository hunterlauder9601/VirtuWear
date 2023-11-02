import React from "react";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

type Props = {};

const MiscProducts = async (props: Props) => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { category: "misc" },
  });

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        <h1 className="mb-12 -skew-x-6 p-2 text-3xl font-bold tracking-widest bg-gradient-to-r from-primary to-secondary text-base-100">
          MISC PRODUCTS
        </h1>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiscProducts;

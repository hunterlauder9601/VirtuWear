import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

type Props = {};

const Products = async (props: Props) => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        <h1 className="mb-12 -skew-x-6 bg-secondary p-2 text-3xl font-bold tracking-widest">
          Products
        </h1>
        <div className="btn-group btn-group-vertical mb-8 lg:btn-group-horizontal">
            <input type="radio" name="options" data-title="MEN&apos;S" className="btn" checked/>
            <input type="radio" name="options" data-title="WOMEN&apos;S" className="btn"/>
            <input type="radio" name="options" data-title="MISC"className="btn" />
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

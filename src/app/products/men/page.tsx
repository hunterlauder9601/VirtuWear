import React from "react";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

type Props = {};

const MensProducts = async (props: Props) => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { category: "men" },
  });

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        <h1 className="mb-12 -skew-x-6 p-2 text-3xl font-bold tracking-widest bg-gradient-to-r from-primary to-accent text-base-100">
          MEN&apos;S PRODUCTS
        </h1>
        <div className="btn-group btn-group-vertical mb-8 lg:btn-group-horizontal">
            <input type="radio" name="options" data-title="ALL" className="btn" defaultChecked/>
            <input type="radio" name="options" data-title="HEAD" className="btn" />
            <input type="radio" name="options" data-title="TORSO" className="btn"/>
            <input type="radio" name="options" data-title="LEGS" className="btn"/>
            <input type="radio" name="options" data-title="FEET" className="btn"/>
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

export default MensProducts;

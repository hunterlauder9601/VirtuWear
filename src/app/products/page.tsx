import React from "react";
import Link from "next/link";

type Props = {};

const Products = async (props: Props) => {

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        <h1 className="mb-12 -skew-x-6 bg-secondary p-2 text-3xl font-bold tracking-widest">
          Products
        </h1>

        <div className="my-4 flex items-center justify-center flex-col md:flex-row gap-4">
          <Link href={'/products/men'} className="btn ccButtonMain">MEN&apos;S</Link>
          <Link href={'/products/women'} className="btn ccButtonMain">WOMEN&apos;S</Link>
          <Link href={'/products/misc'} className="btn ccButtonMain">MISC</Link>
        </div>
      </div>
    </div>
  );
};

export default Products;

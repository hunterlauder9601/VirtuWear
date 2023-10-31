import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <h1 className="mb-6 text-3xl font-bold tracking-wider">Products</h1>
    </div>
  );
};

export default page;

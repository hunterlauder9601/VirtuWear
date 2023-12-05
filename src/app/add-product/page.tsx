import React from "react";
import { protectPath } from "./serverActions";
import { ProtectedAddProduct } from "./ProtectedAddProduct";

const page = async () => {
  await protectPath();
  return <ProtectedAddProduct/>;
};

export default page;

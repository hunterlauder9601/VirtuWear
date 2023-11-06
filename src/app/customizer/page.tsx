import React from "react";
import prisma from "@/lib/db/prisma";
import Customizer from "./Customizer";

const getAllClothes = async (category: string) => {
  return await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { category },
  });
};

type Props = {};

const page = async (props: Props) => {
  const products = await getAllClothes("men");
  return <Customizer data={products}/>;
};

export default page;

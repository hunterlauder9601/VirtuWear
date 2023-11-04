import { cache } from "react";
import prisma from "./db/prisma";

export const revalidate = 3600; // revalidate the data at most every hour

export const getAllItems = cache(
  async (currentPage: number, pageSize: number, heroItemCount: number) => {
    return await prisma.product.findMany({
      orderBy: { id: "desc" },
      skip:
        (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
      take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    });
  },
);

export const getClothingItems = cache(
  async (
    category: string,
    clothesCategory: string,
    currentPage: number,
    pageSize: number,
    heroItemCount: number,
  ) => {
    if (clothesCategory === "all") {
      return await prisma.product.findMany({
        orderBy: { id: "desc" },
        where: { category },
        skip:
          (currentPage - 1) * pageSize +
          (currentPage === 1 ? 0 : heroItemCount),
        take: pageSize + (currentPage === 1 ? heroItemCount : 0),
      });
    }
    return await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: { category, clothesCategory },
      skip:
        (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
      take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    });
  },
);

export const getMiscItems = cache(
  async (
    category: string,
    currentPage: number,
    pageSize: number,
    heroItemCount: number,
  ) => {
    return await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: { category },
      skip:
        (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
      take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    });
  },
);

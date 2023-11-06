// "use server";

//todo: make customizer use cached product page data or make product page use customizer data (whichever comes first, for men and women datas separately)
//

import { cache } from "react";
import prisma from "./db/prisma";
import { redis } from "./db/redis";

export const revalidate = 3600; // revalidate the data at most every hour

export const getAllItems = async (
  currentPage: number,
  pageSize: number,
  heroItemCount: number,
) => {
  const cached = await redis.get(`home-${currentPage}`);
  if(cached) {
    return JSON.parse(cached);
  }

  const query = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  redis.set(`home-${currentPage}`, JSON.stringify(query));

  return query;
};

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

export const getAllClothes = cache(async (category: string) => {
  return await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { category },
  });
});

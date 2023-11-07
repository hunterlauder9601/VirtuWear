// "use server";

//todo: make customizer use cached product page data or make product page use customizer data (whichever comes first, for men and women datas separately)
//

import prisma from "./db/prisma";
import { redis } from "./db/redis";

export const getAllItems = async (
  currentPage: number,
  pageSize: number,
  heroItemCount: number,
) => {
  const cacheKey = `home-${currentPage}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const query = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        price: true,
      },
      orderBy: { id: "desc" },
      skip:
        (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
      take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    });

    // Set the cache with an expiration time (TTL), e.g., 1 hour.
    await redis.set(cacheKey, JSON.stringify(query));
    await redis.expire(cacheKey, 3600);

    return query;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw error;
  }
};

// export const getClothingItems = cache(
//   async (
//     category: string,
//     clothesCategory: string,
//     currentPage: number,
//     pageSize: number,
//     heroItemCount: number,
//   ) => {
//     if (clothesCategory === "all") {
//       return await prisma.product.findMany({
//         orderBy: { id: "desc" },
//         where: { category },
//         skip:
//           (currentPage - 1) * pageSize +
//           (currentPage === 1 ? 0 : heroItemCount),
//         take: pageSize + (currentPage === 1 ? heroItemCount : 0),
//       });
//     }
//     return await prisma.product.findMany({
//       orderBy: { id: "desc" },
//       where: { category, clothesCategory },
//       skip:
//         (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
//       take: pageSize + (currentPage === 1 ? heroItemCount : 0),
//     });
//   },
// );

export const getClothingItems = async (
  category: string,
  clothesCategory: string,
  currentPage: number,
  pageSize: number,
) => {
  const cacheKey = `clothingItems-${category}-${clothesCategory}-${currentPage}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const whereCondition =
      clothesCategory === "all" ? { category } : { category, clothesCategory };

    const query = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        price: true,
      },
      orderBy: { id: "desc" },
      where: whereCondition,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    await redis.set(cacheKey, JSON.stringify(query));
    await redis.expire(cacheKey, 3600);

    return query;
  } catch (error) {
    console.error("Failed to fetch clothing items:", error);
    throw error;
  }
};

// export const getMiscItems = async (
//   category: string,
//   currentPage: number,
//   pageSize: number,
//   heroItemCount: number,
// ) => {
//   return await prisma.product.findMany({
//     orderBy: { id: "desc" },
//     where: { category },
//     skip:
//       (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
//     take: pageSize + (currentPage === 1 ? heroItemCount : 0),
//   });
// };

// export const getAllClothes = async (category: string) => {
//   return await prisma.product.findMany({
//     orderBy: { id: "desc" },
//     where: { category },
//   });
// };

export const getMiscItems = async (
  category: string,
  currentPage: number,
  pageSize: number,
) => {
  const cacheKey = `miscItems-${category}-${currentPage}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const query = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        price: true,
      },
      orderBy: { id: "desc" },
      where: { category },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    await redis.set(cacheKey, JSON.stringify(query));
    await redis.expire(cacheKey, 3600);

    return query;
  } catch (error) {
    console.error("Failed to fetch misc items:", error);
    throw error;
  }
};

export const getAllClothes = async (category: string) => {
  const cacheKey = `allClothes-${category}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const query = await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: { category },
    });

    await redis.set(cacheKey, JSON.stringify(query));
    await redis.expire(cacheKey, 3600);

    return query;
  } catch (error) {
    console.error("Failed to fetch all clothes:", error);
    throw error;
  }
};

export const productCount = async (
  category: string,
  clothesCategory: string,
) => {
  const cacheKey = `productCount-${category}-${clothesCategory}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    let whereCondition = {};
    if(clothesCategory !== "all" && category !== "all") {
      whereCondition = {category, clothesCategory}
    } else if(category !== "all") {
      whereCondition = {category}
    }

    const query = await prisma.product.count({
      where: whereCondition,
    });

    await redis.set(cacheKey, JSON.stringify(query));
    await redis.expire(cacheKey, 3600);

    return query;
  } catch (error) {
    console.error("Failed to fetch product count", error);
    throw error;
  }
};

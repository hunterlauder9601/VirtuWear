"use server";

import prismaBase from "./db/prisma";
import { redis } from "./db/redis";
import { notFound } from "next/navigation";

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

    const query = await prismaBase.product.findMany({
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

    let whereCondition;

    if (clothesCategory === "all") {
      whereCondition = {
        OR: [{ category: "unisex" }, { category }],
      };
    } else {
      // Retrieves items that are either unisex or match the specific category
      // and also match the specific clothesCategory
      whereCondition = {
        AND: [
          {
            OR: [{ category: "unisex" }, { category }],
          },
          { clothesCategory },
        ],
      };
    }

    const query = await prismaBase.product.findMany({
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

    const query = await prismaBase.product.findMany({
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

    const query = await prismaBase.product.findMany({
      orderBy: { id: "desc" },
      where: { OR: [{ category: "unisex" }, { category }] },
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
      console.log(JSON.parse(cached));
      return JSON.parse(cached);
    }

    let whereCondition = {};
    if (clothesCategory !== "all" && category !== "all") {
      whereCondition = {
        AND: [
          {
            OR: [{ category: "unisex" }, { category }],
          },
          { clothesCategory },
        ],
      };
    } else if (category !== "all") {
      whereCondition = { OR: [{ category: "unisex" }, { category }] };
    }

    const query = await prismaBase.product.count({
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

export const getProduct = async (id: string) => {
  const cacheKey = `product-${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const product = await prismaBase.product.findUnique({ where: { id } });

    if (!product) return notFound();

    await redis.set(cacheKey, JSON.stringify(product));
    await redis.expire(cacheKey, 3600);

    return product;
  } catch (error) {
    console.error("Failed to unique product: ", error);
    throw error;
  }
};

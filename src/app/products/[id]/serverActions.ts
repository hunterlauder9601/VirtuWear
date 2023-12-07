"use server";

import { createCart, getCart } from "@/lib/cartDBmethods";
import prismaBase from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
  productId: string,
  selectedColor: string,
) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find(
    (item) => item.productId === productId && item.color === selectedColor,
  );

  if (articleInCart) {
    await prismaBase.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prismaBase.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
            color: selectedColor,
          },
        },
      },
    });
  }

  revalidatePath("/products/[id]");
}

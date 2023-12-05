import prisma from "../db/prisma";

export default async function cleanUpCarts() {
  const threeDaysAgo = new Date(new Date().getTime() - 72 * 60 * 60 * 1000);

  try {
    const deletedCarts = await prisma.cart.deleteMany({
      where: {
        AND: [{ user: null }, { updatedAt: { lt: threeDaysAgo } }],
      },
    });

    console.log(`Deleted ${deletedCarts.count} carts.`);
  } catch (error) {
    console.error("Failed to delete carts:", error);
  }
}

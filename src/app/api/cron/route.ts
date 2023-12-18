import prisma from "../../../lib/db/prisma";

export async function GET() {
  const threeDaysAgo = new Date(new Date().getTime() - 72 * 60 * 60 * 1000);

  try {
    const deletedCarts = await prisma.cart.deleteMany({
      where: {
        AND: [{ user: null }, { updatedAt: { lt: threeDaysAgo } }],
      },
    });

    console.log(`Deleted ${deletedCarts.count} carts.`);

    return Response.json({ message: `Deleted ${deletedCarts.count} carts.` });
  } catch (error) {
    console.error("Failed to delete carts:", error);

    return Response.json({ error: "Failed to delete carts" });
  }
}
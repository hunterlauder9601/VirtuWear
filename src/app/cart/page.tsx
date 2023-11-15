import { getCart } from "@/lib/cartDBmethods";
import formatMoney from "@/lib/formatMoney";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./serverActions";

export const metadata = {
  title: "Your Cart - VirtuWear",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="flex max-h-fit min-h-screen w-full flex-col items-center justify-center bg-base-100 text-white text-lg">
      <div className="mt-[64px] flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
        <div>
          {cart?.items.map((cartItem) => (
            <CartEntry
              cartItem={cartItem}
              key={cartItem.id}
              setProductQuantity={setProductQuantity}
            />
          ))}
        </div>
        {!cart?.items.length && <p>Your cart is empty.</p>}
        <div className="flex flex-col items-end sm:items-center">
          <p className="mb-3 font-bold">
            Total: {formatMoney(cart?.subtotal || 0)}
          </p>
          <button className="ccButtonMain btn sm:w-[200px]">Checkout</button>
        </div>
      </div>
    </div>
  );
}

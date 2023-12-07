import Link from "next/link";

export const metadata = {
  title: "Products - VirtuWear",
};

const Products = async () => {
  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        <h1 className="mb-12 -skew-x-6 bg-secondary p-2 text-3xl font-bold tracking-widest">
          Products
        </h1>

        <div className="my-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href={"/products/men"} className="ccButtonMain btn">
            MEN&apos;S
          </Link>
          <Link href={"/products/women"} className="ccButtonMain btn">
            WOMEN&apos;S
          </Link>
          <Link href={"/products/misc"} className="ccButtonMain btn">
            MISC
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;

import ProductCard from "@/components/ProductCard";
import { getClothingItems, productCount } from "@/lib/dbMethods";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";

export const metadata = {
  title: "Women's Products - VirtuWear",
};

interface WomensProductsProps {
  searchParams: { group: string; page: string };
}

export default async function WomensProducts({
  searchParams: { group = "all", page = "1" },
}: WomensProductsProps) {
  const categories = ["all", "head", "glasses", "torso", "legs", "feet"];

  const currentPage = parseInt(page);

  const pageSize = 6;

  const totalItemCount = await productCount("women", group);

  const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await getClothingItems(
    "women",
    group,
    currentPage,
    pageSize,
  );

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-start  bg-base-100 text-white">
      <div className="mt-[calc(64px+10vh)] flex h-full w-full max-w-6xl flex-col items-center justify-start p-4">
        <h1 className="mb-12 -skew-x-6 bg-gradient-to-r from-secondary to-accent p-2 text-3xl font-bold tracking-widest text-base-100">
          WOMEN&apos;S PRODUCTS
        </h1>
        <div className="btn-group btn-group-vertical mb-8 lg:btn-group-horizontal">
          {categories.map((category) => (
            <Link
              href={`/products/women?group=${category}`}
              key={category}
              className={`btn ${group === category && "btn-active"}`}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}

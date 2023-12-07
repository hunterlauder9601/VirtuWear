import ProductCard from "@/components/ProductCard";
import { getMiscItems, productCount } from "@/lib/dbMethods";
import PaginationBar from "@/components/PaginationBar";

export const metadata = {
  title: "Misc Products - VirtuWear",
};

interface MiscProductsProps {
  searchParams: { page: string };
}

export default async function MiscProducts({
  searchParams: { page = "1" },
}: MiscProductsProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;

  const totalItemCount = await productCount("misc", "all");

  const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await getMiscItems("misc", currentPage, pageSize);

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-start  bg-base-100 text-white">
      <div className="mt-[calc(64px+10vh)] flex h-full w-full max-w-6xl flex-col items-center justify-start p-4">
        <h1 className="mb-12 -skew-x-6 bg-gradient-to-r from-primary to-secondary p-2 text-3xl font-bold tracking-widest text-base-100">
          MISC PRODUCTS
        </h1>
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

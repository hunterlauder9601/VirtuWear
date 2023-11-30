import ProductCard from "@/components/ProductCard";
import { getAllItems, productCount } from "@/lib/dbMethods";
import Image from "next/image";
import Link from "next/link";
import colors from "@/lib/Watercolor-PNG-File.png";
import PaginationBar from "@/components/PaginationBar";
import TypewriterTitle from "@/components/TypeWriter";

interface HomeProps {
  searchParams: { page: string };
}

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;

  const heroItemCount = 1;

  const totalItemCount = await productCount("all", "all");

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await getAllItems(currentPage, pageSize, heroItemCount);

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center bg-base-100 text-white">
      <div className="mt-[64px] flex h-full w-full max-w-6xl flex-col items-center justify-center p-4">
        {currentPage === 1 && (
          <>
            <div className="relative flex h-[calc(66vh-65px)] w-full flex-col items-center justify-center md:h-[calc(50vh-65px)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={colors}
                  alt=""
                  width={700}
                  quality={80}
                  placeholder="blur"
                  draggable={false}
                  className="blur-3xl brightness-75 filter"
                />
              </div>
              <h1 className="z-10 mb-4 -skew-x-6 text-5xl font-bold">
                VirtuWear
              </h1>
              <h2 className="z-10 text-2xl font-bold">
                <TypewriterTitle />
              </h2>
              <Link href="/customizer" className="z-10 ccButtonMain btn border-0 mt-8">
                Try 3D Customizer
              </Link>
            </div>
            <div className="hero rounded-xl bg-base-200">
              <div className="hero-content flex-col lg:flex-row">
                <Image
                  src={products[0].imageUrl[0]}
                  alt={products[0].name}
                  width={400}
                  height={800}
                  draggable={false}
                  className="w-full max-w-sm rounded-lg shadow-2xl"
                  priority
                />
                <div>
                  <h1 className="text-5xl font-bold">{products[0].name}</h1>
                  <p className="py-6">{products[0].description}</p>
                  <Link
                    href={"/products/" + products[0].id}
                    className="ccButtonMain btn"
                  >
                    Check it out
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(currentPage === 1 ? products.slice(1) : products).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}

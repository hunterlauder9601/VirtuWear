import formatMoney from "@/lib/formatMoney";
import { Metadata } from "next";
import Image from "next/image";
import { getProduct } from "@/lib/dbMethods";
import AddToCartButton from "./AddToCart";
import { incrementProductQuantity } from "./serverActions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - VirtuWear",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl[0] }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex max-h-fit min-h-screen w-full flex-col items-center justify-center bg-base-100 text-lg text-white">
      <div className="mt-[64px] flex h-full w-full flex-col items-center justify-center gap-4 p-4 xl:flex-row">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="carousel w-full min-w-[35vw]">
            {product.imageUrl.map((img: string, index: number) => (
              <div
                id={`item${index}`}
                key={index}
                className="carousel-item flex w-full items-end justify-center"
              >
                {index === 0 ? (
                  <Image
                    src={img}
                    alt={product.name}
                    draggable={false}
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                    priority
                  />
                ) : (
                  <Image
                    loading="lazy"
                    src={img}
                    alt={product.name}
                    draggable={false}
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center gap-2 py-2">
            {product.imageUrl.map((img: string, index: number) => (
              <a href={`#item${index}`} className="btn btn-sm" key={index}>
                {index + 1}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <span className="mt-4">{formatMoney(product.price)}</span>
          <p className="py-6">{product.description}</p>
          <AddToCartButton
            productId={product.id}
            colors={product.colors}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
    </div>
  );
}

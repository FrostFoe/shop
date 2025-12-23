"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { ProductCard, SmallProductCard } from "@/components/ProductCard";

export const HomePage = () => {
  const { filteredProducts } = useShop();
  const heroProducts = filteredProducts.slice(0, 3);
  const carouselProducts = filteredProducts.slice(3);

  if (heroProducts.length === 0)
    return (
      <div className="p-8 text-center min-h-[50vh]">
        কোন পণ্য পাওয়া যায়নি।
      </div>
    );

  return (
    <>
      <section className="mx-auto grid max-w-[96rem] gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        {heroProducts[0] && (
          <div className="md:col-span-4 md:row-span-2">
            <ProductCard
              product={heroProducts[0]}
              className="aspect-square"
            />
          </div>
        )}
        {heroProducts[1] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[1]}
              className="aspect-square"
            />
          </div>
        )}
        {heroProducts[2] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[2]}
              className="aspect-square"
            />
          </div>
        )}
      </section>

      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4 px-4">
          {carouselProducts.map((product) => (
            <li
              key={product.id}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              <SmallProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
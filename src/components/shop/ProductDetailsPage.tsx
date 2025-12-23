"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { SmallProductCard } from "@/components/ProductCard";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Product } from "@/types";

export const ProductDetailsPage = ({ product }: { product: Product }) => {
  const { addToCart, products } = useShop();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : undefined,
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined,
  );
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    const nextIdx = (imageIndex + 1) % product.images.length;
    setImageIndex(nextIdx);
    setSelectedImage(product.images[nextIdx]);
  };

  const handlePrevImage = () => {
    const nextIdx =
      (imageIndex - 1 + product.images.length) % product.images.length;
    setImageIndex(nextIdx);
    setSelectedImage(product.images[nextIdx]);
  };

  const isAddToCartEnabled =
    (!product.colors || selectedColor) && (!product.sizes || selectedSize);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <>
      <div className="mx-auto max-w-[96rem] px-4 py-8">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
              <img
                alt={product.title}
                className="h-full w-full object-contain"
                src={selectedImage}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: 0,
                  color: "transparent",
                }}
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-[15%] flex w-full justify-center">
                  <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
                    <button
                      aria-label="Previous product image"
                      onClick={handlePrevImage}
                      className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center"
                    >
                      <ArrowLeft className="h-5" />
                    </button>
                    <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                    <button
                      aria-label="Next product image"
                      onClick={handleNextImage}
                      className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center"
                    >
                      <ArrowRight className="h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
                {product.images.map((img, idx) => (
                  <li key={idx} className="h-20 w-20">
                    <button
                      aria-label="Select product image"
                      className="h-full w-full"
                      onClick={() => {
                        setSelectedImage(img);
                        setImageIndex(idx);
                      }}
                    >
                      <div
                        className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:hover:border-blue-600 dark:bg-black ${
                          selectedImage === img
                            ? "border-2 border-blue-600"
                            : "border-neutral-200 dark:border-neutral-800"
                        }`}
                      >
                        <img
                          alt="thumbnail"
                          className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                          src={img}
                          style={{ color: "transparent" }}
                        />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="basis-full lg:basis-2/6">
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
              <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
              <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                <p>
                  ৳{product.price.toFixed(2)}
                  <span className="ml-1 inline">{product.currency}</span>
                </p>
              </div>
            </div>

            {product.colors && (
              <dl className="mb-8">
                <dt className="mb-4 text-sm uppercase tracking-wide">রঙ</dt>
                <dd className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={`Color ${color}`}
                      className={`flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm transition duration-300 ease-in-out ${selectedColor === color ? "ring-2 ring-blue-600 bg-neutral-100 dark:bg-neutral-900 border-blue-600" : "bg-neutral-100 dark:bg-neutral-900 border-transparent hover:ring-blue-600 dark:border-neutral-800"}`}
                    >
                      {color}
                    </button>
                  ))}
                </dd>
              </dl>
            )}

            {product.sizes && (
              <dl className="mb-8">
                <dt className="mb-4 text-sm uppercase tracking-wide">সাইজ</dt>
                <dd className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      title={`Size ${size}`}
                      className={`flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm transition duration-300 ease-in-out ${selectedSize === size ? "ring-2 ring-blue-600 bg-neutral-100 dark:bg-neutral-900 border-blue-600" : "bg-neutral-100 dark:bg-neutral-900 border-transparent hover:ring-blue-600 dark:border-neutral-800"}`}
                    >
                      {size}
                    </button>
                  ))}
                </dd>
              </dl>
            )}

            <div className="prose mx-auto max-w-6xl text-base leading-7 text-black mb-6 text-sm leading-tight dark:text-white/[60%]">
              {product.description}
            </div>
            <button
              aria-label="Add To Cart"
              onClick={() =>
                isAddToCartEnabled &&
                addToCart({ product, selectedColor, selectedSize, quantity: 1 })
              }
              disabled={!isAddToCartEnabled}
              className={`relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white ${!isAddToCartEnabled ? "cursor-not-allowed opacity-60 hover:opacity-60" : "hover:opacity-90"}`}
            >
              <div className="absolute left-0 ml-4">
                <Plus className="h-5" />
              </div>
              কার্টে যোগ করুন
            </button>
          </div>
        </div>
        <div className="py-8">
          <h2 className="mb-4 text-2xl font-bold">সম্পর্কিত পণ্য</h2>
          <ul className="flex w-full gap-4 overflow-x-auto pt-1">
            {relatedProducts.map((p) => (
              <li
                key={p.id}
                className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
              >
                <SmallProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

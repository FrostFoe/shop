"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { ProductCard, SmallProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Product } from "../types";

export const HomePage = () => {
  const { filteredProducts, navigateToProduct } = useShop();
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
              onClick={navigateToProduct}
            />
          </div>
        )}
        {heroProducts[1] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[1]}
              className="aspect-square"
              onClick={navigateToProduct}
            />
          </div>
        )}
        {heroProducts[2] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[2]}
              className="aspect-square"
              onClick={navigateToProduct}
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
              <SmallProductCard product={product} onClick={navigateToProduct} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const ProductDetailsPage = ({ product }: { product: Product }) => {
  const { addToCart, products, navigateToProduct } = useShop();
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
      <div className="mx-auto max-w-[96rem] px-4">
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
                <SmallProductCard product={p} onClick={navigateToProduct} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const CheckoutPage = () => {
  const { cart, handlePlaceOrder, navigateToHome } = useShop();
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handlePlaceOrder();
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
        <p className="text-neutral-500 mb-8">শুরু করার জন্য কিছু পণ্য যোগ করুন।</p>
        <button
          onClick={navigateToHome}
          className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          কেনাকাটা চালিয়ে যান
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <button
        onClick={navigateToHome}
        className="mb-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> স্টোরে ফিরে যান
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="mb-6 text-3xl font-bold">চেকআউট</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
              <h2 className="mb-4 text-xl font-semibold">শিপিং তথ্য</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">নামের প্রথম অংশ</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">নামের শেষ অংশ</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="Doe"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">ঠিকানা</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="123 Main St"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "প্রসেসিং..." : `পরিশোধ করুন ৳${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div>
          <div className="sticky top-24 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 text-xl font-semibold">অর্ডার সারাংশ</h2>
            <ul className="mb-6 space-y-4">
              {cart.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
                    <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.selectedColor} {item.selectedSize && `/ ${item.selectedSize}`}
                    </p>
                    <p className="text-sm text-neutral-500">পরিমাণ: {item.quantity}</p>
                  </div>
                  <p className="font-medium">৳{(item.product.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <div className="flex justify-between font-bold text-lg">
                <span>মোট</span>
                <span>৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderSuccess = () => {
  const { navigateToHome } = useShop();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6 dark:bg-green-900/30">
        <svg
          className="h-12 w-12 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="mb-2 text-3xl font-bold">আপনার অর্ডারের জন্য ধন্যবাদ!</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">
        আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আপনি একটি ইমেল কনফার্মেশন পাবেন।
      </p>
      <button
        onClick={navigateToHome}
        className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        কেনাকাটা চালিয়ে যান
      </button>
    </div>
  );
};

"use client";

import React, { use } from "react";
import { useShop } from "../../../context/ShopContext";
import { ProductDetailsPage } from "../../../components/Pages";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useShop();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-neutral-500">দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা আমাদের কাছে নেই।</p>
      </div>
    );
  }

  return <ProductDetailsPage product={product} />;
}

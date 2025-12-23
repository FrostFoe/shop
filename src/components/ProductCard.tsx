"use client";

import React from "react";
import { Product } from "../types";

export const ProductCard = ({
  product,
  className = "",
  onClick,
}: {
  product: Product;
  className?: string;
  onClick?: (product: Product) => void;
}) => (
  <a
    className={`relative block h-full w-full ${className}`}
    href="#"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick(product);
    }}
  >
    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
      <img
        alt={product.title}
        src={product.images[0]}
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
        style={{ color: "transparent" }}
      />
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
            {product.title}
          </h3>
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            ৳{product.price.toFixed(2)}
            <span className="ml-1 inline hidden @[275px]/label:inline">
              {product.currency}
            </span>
          </p>
        </div>
      </div>
    </div>
  </a>
);

export const SmallProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick?: (product: Product) => void;
}) => (
  <a
    className="relative h-full w-full"
    href="#"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick(product);
    }}
  >
    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
      <img
        alt={product.title}
        src={product.images[0]}
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
        style={{ color: "transparent" }}
      />
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
            {product.title}
          </h3>
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            ৳{product.price.toFixed(2)}
            <span className="ml-1 inline hidden @[275px]/label:inline">
              {product.currency}
            </span>
          </p>
        </div>
      </div>
    </div>
  </a>
);

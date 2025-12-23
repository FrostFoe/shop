"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { ShoppingCart, X } from "lucide-react";

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, navigateToCheckout } = useShop();

  if (!isCartOpen) return null;
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div className="relative h-full w-full max-w-md bg-white p-6 shadow-xl dark:bg-black dark:text-white transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">শপিং কার্ট</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart className="h-12 w-12 text-neutral-400" />
            <p className="text-neutral-500">আপনার কার্ট খালি।</p>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <ul className="flex-1 overflow-y-auto py-4">
              {cart.map((item, idx) => (
                <li
                  key={idx}
                  className="flex py-6 border-b border-neutral-200 dark:border-neutral-700 last:border-0"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.product.title}</h3>
                        <p className="ml-4">
                          ৳{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.selectedColor}{" "}
                        {item.selectedSize ? ` / ${item.selectedSize}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-neutral-500">পরিমাণ {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-200 dark:border-neutral-700 py-6">
              <div className="flex justify-between text-base font-medium">
                <p>মোট মূল্য</p>
                <p>৳{total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-neutral-500">
                শিপিং এবং ট্যাক্স চেকআউটের সময় হিসেব করা হবে।
              </p>
              <div className="mt-6">
                <button
                  onClick={navigateToCheckout}
                  className="flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  চেকআউট
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { ArrowLeft } from "lucide-react";

interface CheckoutPageProps {
  onOrderSuccess: () => void;
}

export const CheckoutPage = ({ onOrderSuccess }: CheckoutPageProps) => {
  const { cart, cartTotal } = useShop();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address) {
      alert("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onOrderSuccess();
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
        <p className="text-neutral-500 mb-8">শুরু করার জন্য কিছু পণ্য যোগ করুন।</p>
        <Link
          href="/"
          className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          কেনাকাটা চালিয়ে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> স্টোরে ফিরে যান
      </Link>

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
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">নামের শেষ অংশ</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">ঠিকানা</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "প্রসেসিং..." : `পরিশোধ করুন ৳${cartTotal.toFixed(2)}`}
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
                <span>৳{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
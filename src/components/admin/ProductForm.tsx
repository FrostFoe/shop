"use client";

import React from "react";
import { Product } from "@/types";
import { ArrowUp, ArrowDown, X, Plus } from "lucide-react";

interface ProductFormProps {
  product: Product;
  onChange: (product: Product) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProductForm = ({
  product,
  onChange,
  onSave,
  onCancel,
}: ProductFormProps) => {
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...product.images];
    newImages[index] = value;
    onChange({ ...product, images: newImages });
  };

  const addImage = () => {
    onChange({ ...product, images: [...product.images, ""] });
  };

  const removeImage = (index: number) => {
    onChange({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...product.images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[index],
    ];
    onChange({ ...product, images: newImages });
  };

  const isFormValid = product.title.trim() !== "" && product.price >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
      <div className="space-y-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase">
          প্রজেক্ট শিরোনাম *
        </label>
        <input
          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
          value={product.title}
          onChange={(e) => onChange({ ...product, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase">
          ক্যাটাগরি
        </label>
        <select
          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
          value={product.category}
          onChange={(e) => onChange({ ...product, category: e.target.value })}
        >
          <option value="ওয়েব অ্যাপ">ওয়েব অ্যাপ</option>
          <option value="টেম্পলেট">টেম্পলেট</option>
          <option value="ব্যাকএন্ড">ব্যাকএন্ড</option>
          <option value="সফটওয়্যার">সফটওয়্যার</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase">
          দাম (৳) *
        </label>
        <input
          type="number"
          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
          value={product.price}
          onChange={(e) =>
            onChange({ ...product, price: parseFloat(e.target.value) || 0 })
          }
          required
          min="0"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase">
          বিবরণ
        </label>
        <input
          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
          value={product.description}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
          ছবি গ্যালারি
        </label>
        <div className="space-y-3">
          {product.images.map((url, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                {url && (
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>
              <input
                className="flex-1 w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black text-sm"
                value={url}
                placeholder="ছবির URL দিন..."
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <button
                onClick={() => moveImage(index, "up")}
                disabled={index === 0}
                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                type="button"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveImage(index, "down")}
                disabled={index === product.images.length - 1}
                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                type="button"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeImage(index)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
          >
            <Plus className="h-4 w-4" /> নতুন ছবি যোগ করুন
          </button>
        </div>
      </div>
      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white"
        >
          বাতিল
        </button>
        <button
          onClick={onSave}
          disabled={!isFormValid}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          পরিবর্তন সংরক্ষণ করুন
        </button>
      </div>
    </div>
  );
};
"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ProductForm } from "./ProductForm";

export const AdminDashboard = () => {
  const { products, setProducts } = useShop();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      const cleanedImages = editForm.images.filter((img) => img.trim() !== "");
      const updatedProduct = {
        ...editForm,
        images:
          cleanedImages.length > 0
            ? cleanedImages
            : ["https://placehold.co/600x600/png"],
      };
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `new-project-${Date.now()}`,
      title: "নতুন প্রজেক্ট",
      price: 0,
      currency: "BDT",
      category: "ওয়েব অ্যাপ",
      images: ["https://placehold.co/600x600/png"],
      description: "এখানে বিবরণ দিন...",
      licenseTypes: [],
      supportPeriods: [],
    };
    setProducts([newProduct, ...products]);
    startEdit(newProduct);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছতে চান?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">পণ্য ব্যবস্থাপনা</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> পণ্য যোগ করুন
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900">
            <tr>
              <th className="p-4 font-semibold">ছবি</th>
              <th className="p-4 font-semibold">শিরোনাম</th>
              <th className="p-4 font-semibold">ক্যাটাগরি</th>
              <th className="p-4 font-semibold">দাম</th>
              <th className="p-4 font-semibold text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                {editingId === product.id && editForm ? (
                  <tr>
                    <td colSpan={5} className="p-4">
                      <ProductForm
                        product={editForm}
                        onChange={setEditForm}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-4">
                      <div className="h-12 w-12 overflow-hidden rounded border border-neutral-200 dark:border-neutral-800">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium">{product.title}</td>
                    <td className="p-4 text-neutral-500">{product.category}</td>
                    <td className="p-4">৳{product.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="rounded p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

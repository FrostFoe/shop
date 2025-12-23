"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Product } from "../types";
import {
  ArrowUp,
  ArrowDown,
  X,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

export const AdminLogin = () => {
  const { setIsAdminAuthenticated, setCurrentView } = useShop();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAdminAuthenticated(true);
      // If we are on /admin page, we might not need to set view, but let's keep it for compatibility
      setCurrentView("admin_dashboard");
    } else {
      setError("ভুল তথ্য। অনুগ্রহ করে admin:admin ব্যবহার করুন");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black">
        <h2 className="mb-6 text-2xl font-bold text-center">অ্যাডমিন লগইন</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              ব্যবহারকারীর নাম
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="admin"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            লগইন
          </button>
        </form>
      </div>
    </div>
  );
};

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
      id: `new-product-${Date.now()}`,
      title: "নতুন পণ্য",
      price: 0,
      currency: "BDT",
      category: "শার্ট",
      images: ["https://placehold.co/600x600/png"],
      description: "এখানে বিবরণ দিন...",
      colors: [],
      sizes: [],
    };
    setProducts([newProduct, ...products]);
    startEdit(newProduct);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
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
              <tr
                key={product.id}
                className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
              >
                {editingId === product.id && editForm ? (
                  <td colSpan={5} className="p-4 bg-neutral-50 dark:bg-neutral-900">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          শিরোনাম
                        </label>
                        <input
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          ক্যাটাগরি
                        </label>
                        <select
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        >
                          <option value="শার্ট">শার্ট</option>
                          <option value="স্টিকার">স্টিকার</option>
                          <option value="এক্সেসরিজ">এক্সেসরিজ</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          দাম (৳)
                        </label>
                        <input
                          type="number"
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.price}
                          onChange={(e) =>
                            setEditForm({ ...editForm, price: parseFloat(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          বিবরণ
                        </label>
                        <input
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({ ...editForm, description: e.target.value })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                          ছবি গ্যালারি
                        </label>
                        <div className="space-y-3">
                          {editForm.images.map((url, index) => (
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
                                onChange={(e) => {
                                  const newImages = [...editForm.images];
                                  newImages[index] = e.target.value;
                                  setEditForm({ ...editForm, images: newImages });
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (index === 0) return;
                                  const newImages = [...editForm.images];
                                  [newImages[index - 1], newImages[index]] = [
                                    newImages[index],
                                    newImages[index - 1],
                                  ];
                                  setEditForm({ ...editForm, images: newImages });
                                }}
                                disabled={index === 0}
                                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (index === editForm.images.length - 1) return;
                                  const newImages = [...editForm.images];
                                  [newImages[index + 1], newImages[index]] = [
                                    newImages[index],
                                    newImages[index + 1],
                                  ];
                                  setEditForm({ ...editForm, images: newImages });
                                }}
                                disabled={index === editForm.images.length - 1}
                                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const newImages = editForm.images.filter((_, i) => i !== index);
                                  setEditForm({ ...editForm, images: newImages });
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => setEditForm({ ...editForm, images: [...editForm.images, ""] })}
                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                          >
                            <Plus className="h-4 w-4" /> নতুন ছবি যোগ করুন
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white"
                        >
                          বাতিল
                        </button>
                        <button
                          onClick={saveEdit}
                          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          পরিবর্তন সংরক্ষণ করুন
                        </button>
                      </div>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="p-4">
                      <div className="h-12 w-12 overflow-hidden rounded border border-neutral-200 dark:border-neutral-800">
                        <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useMemo } from "react";
import { X, Plus, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";

// --- Types ---

type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  description: string;
};

type CartItem = {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
};

// --- Mock Data (Initial State) - Translated ---

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "acme-circles-t-shirt",
    title: "একমি সার্কেল টি-শার্ট",
    price: 2000.0,
    currency: "BDT",
    category: "শার্ট",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png?v=1689798965&w=1080",
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-2.png?v=1689798965&w=1080",
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-circles-blue.png?v=1690003396&w=1080",
    ],
    colors: ["কালো", "সাদা", "নীল"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "৬০% কম্বড রিংস্পান কটন / ৪০% পলিয়েস্টার জার্সি টি।",
  },
  {
    id: "acme-drawstring-bag",
    title: "একমি ড্রস্ট্রিং ব্যাগ",
    price: 1200.0,
    currency: "BDT",
    category: "এক্সেসরিজ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/bag-1-dark.png?v=1689796304&w=1080",
    ],
    colors: ["কালো", "সাদা"],
    description: "আপনার নিত্যপ্রয়োজনীয় জিনিসের জন্য টেকসই ড্রস্ট্রিং ব্যাগ।",
  },
  {
    id: "acme-cup",
    title: "একমি কাপ",
    price: 1500.0,
    currency: "BDT",
    category: "এক্সেসরিজ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/cup-black.png?v=1690003088&w=1080",
    ],
    description: "ম্যাট ব্ল্যাক সিরামিক কাপ।",
  },
  {
    id: "acme-mug",
    title: "একমি মগ",
    price: 1500.0,
    currency: "BDT",
    category: "এক্সেসরিজ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/mug-1.png?v=1690003527&w=1080",
    ],
    description: "স্ট্যান্ডার্ড সাদা সিরামিক মগ।",
  },
  {
    id: "acme-hoodie",
    title: "একমি হুডি",
    price: 5000.0,
    currency: "BDT",
    category: "শার্ট",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/hoodie-1.png?v=1690003482&w=1080",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "উষ্ণ এবং আরামদায়ক হুডি।",
  },
  {
    id: "acme-baby-onesie",
    title: "একমি বেবি ওয়ানসি",
    price: 1000.0,
    currency: "BDT",
    category: "শার্ট",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/baby-onesie-beige-1.png?v=1690002632&w=1080",
    ],
    sizes: ["0-3M", "3-6M", "6-12M"],
    description: "শিশুদের জন্য নরম সুতি ওয়ানসি।",
  },
  {
    id: "acme-baby-cap",
    title: "একমি বেবি ক্যাপ",
    price: 1000.0,
    currency: "BDT",
    category: "এক্সেসরিজ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/baby-cap-black.png?v=1690002570&w=1080",
    ],
    description: "ছোটদের জন্য সুন্দর ক্যাপ।",
  },
  {
    id: "acme-prism-t-shirt",
    title: "একমি প্রিজম টি-শার্ট",
    price: 2500.0,
    currency: "BDT",
    category: "শার্ট",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-spiral-1.png?v=1690003571&w=1080",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "প্রিজম্যাটিক স্পাইরাল ডিজাইনের টি-শার্ট।",
  },
  {
    id: "acme-cap",
    title: "একমি ক্যাপ",
    price: 2000.0,
    currency: "BDT",
    category: "এক্সেসরিজ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/hat-1.png?v=1690002833&w=1080",
    ],
    description: "ক্লাসিক বেসবল ক্যাপ।",
  },
  {
    id: "acme-rainbow-sticker",
    title: "একমি রেইনবো স্টিকার",
    price: 400.0,
    currency: "BDT",
    category: "স্টিকার",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/sticker-rainbow.png?v=1690003602&w=1080",
    ],
    description: "উচ্চ মানের ভিনাইল স্টিকার।",
  },
];

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 28"
    className={className}
    fill="currentColor"
  >
    <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
    <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
  </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);
const CartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);
const PencilIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const AdminLogin = ({ onLogin }: { onLogin: (status: boolean) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin(true);
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

const AdminDashboard = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}: {
  products: Product[];
  onUpdateProduct: (p: Product) => void;
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}) => {
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
      // Remove empty image strings
      const cleanedImages = editForm.images.filter((img) => img.trim() !== "");
      onUpdateProduct({
        ...editForm,
        images:
          cleanedImages.length > 0
            ? cleanedImages
            : ["https://placehold.co/600x600/png"],
      });
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
    onAddProduct(newProduct);
    startEdit(newProduct);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">পণ্য ব্যবস্থাপনা</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4" /> পণ্য যোগ করুন
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
                  <td
                    colSpan={5}
                    className="p-4 bg-neutral-50 dark:bg-neutral-900"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          শিরোনাম
                        </label>
                        <input
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase">
                          ক্যাটাগরি
                        </label>
                        <select
                          className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
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
                            setEditForm({
                              ...editForm,
                              price: parseFloat(e.target.value),
                            })
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
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                          ছবি গ্যালারি
                        </label>
                        <div className="space-y-3">
                          {editForm.images.map((url, index) => (
                            <div
                              key={index}
                              className="flex gap-2 items-center"
                            >
                              <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                                {url && (
                                  <img
                                    src={url}
                                    alt=""
                                    className="h-full w-full object-cover"
                                    onError={(e) =>
                                      (e.currentTarget.style.display = "none")
                                    }
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
                                  setEditForm({
                                    ...editForm,
                                    images: newImages,
                                  });
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
                                  setEditForm({
                                    ...editForm,
                                    images: newImages,
                                  });
                                }}
                                disabled={index === 0}
                                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                                type="button"
                                title="উপরে সরান"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (index === editForm.images.length - 1)
                                    return;
                                  const newImages = [...editForm.images];
                                  [newImages[index + 1], newImages[index]] = [
                                    newImages[index],
                                    newImages[index + 1],
                                  ];
                                  setEditForm({
                                    ...editForm,
                                    images: newImages,
                                  });
                                }}
                                disabled={index === editForm.images.length - 1}
                                className="p-2 text-neutral-500 hover:text-black dark:hover:text-white disabled:opacity-30"
                                type="button"
                                title="নিচে সরান"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const newImages = editForm.images.filter(
                                    (_, i) => i !== index,
                                  );
                                  setEditForm({
                                    ...editForm,
                                    images: newImages,
                                  });
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                type="button"
                                title="মুছুন"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setEditForm({
                                ...editForm,
                                images: [...editForm.images, ""],
                              })
                            }
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
                          title="এডিট"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="ডিলিট"
                        >
                          <TrashIcon className="h-4 w-4" />
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

const ProductCard = ({
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
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label lg:px-20 lg:pb-[35%]">
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

const SmallProductCard = ({
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

const CartDrawer = ({
  show,
  onClose,
  cart,
  onCheckout,
}: {
  show: boolean;
  onClose: () => void;
  cart: CartItem[];
  onCheckout: () => void;
}) => {
  if (!show) return null;
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative h-full w-full max-w-md bg-white p-6 shadow-xl dark:bg-black dark:text-white transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">শপিং কার্ট</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <CartIcon className="h-12 w-12 text-neutral-400" />
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
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
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

const Navbar = ({
  onNavigateHome,
  isDarkMode,
  toggleTheme,
  cartCount,
  onOpenCart,
  setSearchQuery,
  activeCategory,
  onCategoryChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  onNavigateHome: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}) => (
  <nav className="relative flex items-center justify-between p-4 lg:px-6">
    <div className="block flex-none md:hidden">
      <button
        aria-label="Open mobile menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <MenuIcon className="h-4" />
      </button>
    </div>
    {isMobileMenuOpen && (
      <div className="absolute top-full left-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4 md:hidden shadow-xl">
        <ul className="flex flex-col gap-4 text-sm">
          <li>
            <button
              onClick={() => {
                onCategoryChange("All");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left"
            >
              সব
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onCategoryChange("শার্ট");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left"
            >
              শার্ট
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onCategoryChange("স্টিকার");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left"
            >
              স্টিকার
            </button>
          </li>
        </ul>
      </div>
    )}

    <div className="flex w-full items-center">
      <div className="flex w-full md:w-1/3">
        <a
          className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
        >
          <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
            <LogoIcon className="h-4 w-4 fill-black dark:fill-white h-[16px] w-[16px]" />
          </div>
          <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
            একমি স্টোর
          </div>
        </a>
        <ul className="hidden gap-6 text-sm md:flex md:items-center">
          {[
            { id: "All", label: "সব" },
            { id: "শার্ট", label: "শার্ট" },
            { id: "স্টিকার", label: "স্টিকার" },
          ].map((cat) => (
            <li key={cat.id}>
              <button
                className={`underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 ${activeCategory === cat.id ? "text-black dark:text-white underline" : "text-neutral-500 dark:text-neutral-400"}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden justify-center md:flex md:w-1/3">
        <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            autoComplete="off"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          />
          <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
            <SearchIcon className="h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 md:w-1/3">
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {isDarkMode ? (
            <MoonIcon className="h-4 transition-all ease-in-out hover:scale-110" />
          ) : (
            <SunIcon className="h-4 transition-all ease-in-out hover:scale-110" />
          )}
        </button>
        <button aria-label="Open cart" onClick={onOpenCart}>
          <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
            <CartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  </nav>
);

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => (
  <footer className="text-sm text-neutral-500 dark:text-neutral-400">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
      <div>
        <a
          className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
          href="#"
        >
          <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[30px] w-[30px] rounded-lg">
            <LogoIcon className="h-4 w-4 fill-black dark:fill-white h-[10px] w-[10px]" />
          </div>
          <span className="uppercase">একমি স্টোর</span>
        </a>
      </div>
      <nav>
        <ul>
          {[
            "হোম",
            "আমাদের সম্পর্কে",
            "শর্তাবলী",
            "শিপিং এবং রিটার্ন পলিসি",
            "গোপনীয়তা নীতি",
            "জিজ্ঞাসিত প্রশ্ন",
          ].map((item) => (
            <li key={item}>
              <a
                className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300"
                href="#"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
        <p>© ২০২৩-২০২৫ একমি, ইনক. সর্বস্বত্ব সংরক্ষিত।</p>
        <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
        <p>
          <button
            onClick={onAdminClick}
            className="hover:underline hover:text-black dark:hover:text-white"
          >
            অ্যাডমিন
          </button>
        </p>
        <p className="md:ml-auto">
          <a href="#" className="text-black dark:text-white">
            তৈরি করেছেন ▲ Vercel
          </a>
        </p>
      </div>
    </div>
  </footer>
);

const HomePage = ({
  products,
  onNavigate,
}: {
  products: Product[];
  onNavigate: (p: Product) => void;
}) => {
  const heroProducts = products.slice(0, 3);
  const carouselProducts = products.slice(3);

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
              onClick={onNavigate}
            />
          </div>
        )}
        {heroProducts[1] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[1]}
              className="aspect-square"
              onClick={onNavigate}
            />
          </div>
        )}
        {heroProducts[2] && (
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard
              product={heroProducts[2]}
              className="aspect-square"
              onClick={onNavigate}
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
              <SmallProductCard product={product} onClick={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ProductDetailsPage = ({
  product,
  onNavigate,
  addToCart,
  relatedProducts,
}: {
  product: Product;
  onNavigate: (p: Product) => void;
  addToCart: (item: CartItem) => void;
  relatedProducts: Product[];
}) => {
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
                      <ArrowLeftIcon className="h-5" />
                    </button>
                    <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                    <button
                      aria-label="Next product image"
                      onClick={handleNextImage}
                      className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center"
                    >
                      <ArrowRightIcon className="h-5" />
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

            <div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-6 text-sm leading-tight dark:text-white/[60%]">
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
                <PlusIcon className="h-5" />
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
                <SmallProductCard product={p} onClick={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const CheckoutPage = ({
  cart,
  onPlaceOrder,
  onBack,
}: {
  cart: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
}) => {
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder();
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">আপনার কার্ট খালি</h2>
        <p className="text-neutral-500 mb-8">
          শুরু করার জন্য কিছু পণ্য যোগ করুন।
        </p>
        <button
          onClick={onBack}
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
        onClick={onBack}
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">শহর</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">পোস্টাল কোড</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
              <h2 className="mb-4 text-xl font-semibold">পেমেন্ট বিস্তারিত</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">কার্ড নম্বর</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      মেয়াদোত্তীর্ণ
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-black"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing
                ? "প্রসেসিং..."
                : `পরিশোধ করুন ৳${total.toFixed(2)}`}
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
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.selectedColor}{" "}
                      {item.selectedSize && `/ ${item.selectedSize}`}
                    </p>
                    <p className="text-sm text-neutral-500">
                      পরিমাণ: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ৳{(item.product.price * item.quantity).toFixed(2)}
                  </p>
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

const OrderSuccess = ({ onContinue }: { onContinue: () => void }) => (
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
      আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আপনি একটি ইমেল কনফার্মেশন
      পাবেন।
    </p>
    <button
      onClick={onContinue}
      className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
    >
      কেনাকাটা চালিয়ে যান
    </button>
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<
    | "home"
    | "product"
    | "admin_login"
    | "admin_dashboard"
    | "checkout"
    | "order_success"
  >("home");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const navigateToProduct = (product: Product) => {
    setCurrentProduct(product);
    setCurrentView("product");
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentView("home");
    window.scrollTo(0, 0);
  };

  const navigateToAdmin = () => {
    if (isAdminAuthenticated) {
      setCurrentView("admin_dashboard");
    } else {
      setCurrentView("admin_login");
    }
    window.scrollTo(0, 0);
  };

  const navigateToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView("checkout");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setCurrentView("order_success");
    window.scrollTo(0, 0);
  };

  const onCategoryChange = (category: string) => {
    setActiveCategory(category);
    navigateToHome();
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      setCurrentView("admin_dashboard");
    }
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-pink-500 dark:selection:text-white min-h-screen transition-colors duration-300">
        <Navbar
          onNavigateHome={navigateToHome}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          cartCount={cart.length}
          onOpenCart={() => setIsCartOpen(true)}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <CartDrawer
          show={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onCheckout={navigateToCheckout}
        />

        <main>
          {currentView === "home" ? (
            <HomePage
              products={filteredProducts}
              onNavigate={navigateToProduct}
            />
          ) : currentView === "product" && currentProduct ? (
            <ProductDetailsPage
              key={currentProduct.id}
              product={currentProduct}
              onNavigate={navigateToProduct}
              addToCart={addToCart}
              relatedProducts={products
                .filter(
                  (p) =>
                    p.category === currentProduct.category &&
                    p.id !== currentProduct.id,
                )
                .slice(0, 5)}
            />
          ) : currentView === "admin_login" ? (
            <AdminLogin onLogin={handleAdminLogin} />
          ) : currentView === "admin_dashboard" ? (
            <AdminDashboard
              products={products}
              onUpdateProduct={handleUpdateProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          ) : currentView === "checkout" ? (
            <CheckoutPage
              cart={cart}
              onPlaceOrder={handlePlaceOrder}
              onBack={navigateToHome}
            />
          ) : currentView === "order_success" ? (
            <OrderSuccess onContinue={navigateToHome} />
          ) : null}

          <Footer onAdminClick={navigateToAdmin} />
        </main>
      </div>
    </div>
  );
}

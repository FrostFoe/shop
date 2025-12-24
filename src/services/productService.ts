import { Product } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "e-commerce-starter",
    title: "ফুল-স্ট্যাক ই-কমার্স স্টার্টার",
    price: 5000.0,
    currency: "BDT",
    category: "ওয়েব অ্যাপ",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png?v=1689798965&w=1080",
    ],
    licenseTypes: ["Personal", "Commercial"],
    supportPeriods: ["3 Months", "6 Months", "Lifetime"],
    description: "একটি আধুনিক ই-কমার্স প্রজেক্ট যা Next.js এবং Tailwind CSS দিয়ে তৈরি।",
  },
  {
    id: "portfolio-template",
    title: "প্রফেশনাল পোর্টফোলিও টেম্পলেট",
    price: 1500.0,
    currency: "BDT",
    category: "টেম্পলেট",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/bag-1-dark.png?v=1689796304&w=1080",
    ],
    licenseTypes: ["Personal", "Commercial"],
    supportPeriods: ["3 Months", "Lifetime"],
    description: "ডেভেলপার এবং ডিজাইনারদের জন্য প্রিমিয়াম পোর্টফোলিও প্রজেক্ট।",
  },
  {
    id: "task-manager-api",
    title: "টাস্ক ম্যানেজার ব্যাকএন্ড API",
    price: 3000.0,
    currency: "BDT",
    category: "ব্যাকএন্ড",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/cup-black.png?v=1690003088&w=1080",
    ],
    licenseTypes: ["Personal", "Commercial"],
    supportPeriods: ["6 Months", "Lifetime"],
    description: "Node.js এবং MongoDB দিয়ে তৈরি স্কেলেবল API সলিউশন।",
  },
  {
    id: "inventory-system",
    title: "ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম",
    price: 8000.0,
    currency: "BDT",
    category: "সফটওয়্যার",
    images: [
      "https://cdn.shopify.com/s/files/1/0754/3727/7491/files/mug-1.png?v=1690003527&w=1080",
    ],
    licenseTypes: ["Personal", "Commercial"],
    supportPeriods: ["3 Months", "6 Months", "Lifetime"],
    description: "ব্যবসার জন্য পূর্ণাঙ্গ ইনভেন্টরি এবং ইনভয়েসিং প্রজেক্ট।",
  },
];

export const productService = {
  getProducts: () => INITIAL_PRODUCTS,
  getProductById: (id: string) => INITIAL_PRODUCTS.find((p) => p.id === id),
  getCategories: () => ["All", ...new Set(INITIAL_PRODUCTS.map((p) => p.category))],
};
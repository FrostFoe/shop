import { Product } from "../types";

export const INITIAL_PRODUCTS: Product[] = [
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

export const productService = {
  getProducts: () => INITIAL_PRODUCTS,
  getProductById: (id: string) => INITIAL_PRODUCTS.find((p) => p.id === id),
  getCategories: () => ["All", ...new Set(INITIAL_PRODUCTS.map((p) => p.category))],
};

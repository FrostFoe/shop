"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-pink-500 dark:selection:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

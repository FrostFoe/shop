"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useShop();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-pink-500 dark:selection:text-white min-h-screen transition-colors duration-300">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

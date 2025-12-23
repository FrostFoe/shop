"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { LogoIcon } from "./Icons";
import { Menu, Search, Moon, Sun, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const {
    isDarkMode,
    toggleTheme,
    cart,
    setIsCartOpen,
    setSearchQuery,
    activeCategory,
    onCategoryChange,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useShop();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <button
          aria-label="Open mobile menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
        >
          <Menu className="h-4" />
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
          <Link
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
          >
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
              <LogoIcon className="h-4 w-4 fill-black dark:fill-white h-[16px] w-[16px]" />
            </div>
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              একমি স্টোর
            </div>
          </Link>
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
              <Search className="h-4" />
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
              <Moon className="h-4 transition-all ease-in-out hover:scale-110" />
            ) : (
              <Sun className="h-4 transition-all ease-in-out hover:scale-110" />
            )}
          </button>
          <button aria-label="Open cart" onClick={() => setIsCartOpen(true)}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
              <ShoppingCart className="h-4 transition-all ease-in-out hover:scale-110" />
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {cart.length}
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Product, CartItem } from "@/types";
import { INITIAL_PRODUCTS } from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import { useTheme } from "@/hooks/useTheme";

interface ShopContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (status: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  filteredProducts: Product[];
  navigateToAdmin: () => void;
  navigateToCheckout: () => void;
  onCategoryChange: (category: string) => void;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    cart,
    addToCart,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const navigateToAdmin = () => {
    if (pathname !== "/admin") {
      router.push("/admin");
    }
    window.scrollTo(0, 0);
  };

  const navigateToCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
    window.scrollTo(0, 0);
  };

  const onCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        currentProduct,
        setCurrentProduct,
        products,
        setProducts,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        filteredProducts,
        navigateToAdmin,
        navigateToCheckout,
        onCategoryChange,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
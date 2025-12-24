"use client";

import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { CartItem } from "@/types";

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedLicenseType === item.selectedLicenseType &&
          i.selectedSupportPeriod === item.selectedSupportPeriod
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, licenseType?: string, supportPeriod?: string) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedLicenseType === licenseType &&
            i.selectedSupportPeriod === supportPeriod
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    licenseType?: string,
    supportPeriod?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, licenseType, supportPeriod);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId &&
        i.selectedLicenseType === licenseType &&
        i.selectedSupportPeriod === supportPeriod
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  };
}
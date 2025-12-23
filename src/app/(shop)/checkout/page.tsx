"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { CheckoutPage } from "@/components/shop/CheckoutPage";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { clearCart } = useShop();
  const router = useRouter();

  const handleOrderSuccess = () => {
    clearCart();
    router.push("/checkout/success");
  };

  return <CheckoutPage onOrderSuccess={handleOrderSuccess} />;
}
"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { HomePage, CheckoutPage, OrderSuccess } from "../components/Pages";

export default function App() {
  const {
    currentView,
  } = useShop();

  return (
    <>
      {currentView === "home" ? (
        <HomePage />
      ) : currentView === "checkout" ? (
        <CheckoutPage />
      ) : currentView === "order_success" ? (
        <OrderSuccess />
      ) : null}
    </>
  );
}

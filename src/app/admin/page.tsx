"use client";

import React from "react";
import { useShop } from "../../context/ShopContext";
import { AdminLogin, AdminDashboard } from "../../components/Admin";

export default function AdminPage() {
  const { isAdminAuthenticated } = useShop();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
}

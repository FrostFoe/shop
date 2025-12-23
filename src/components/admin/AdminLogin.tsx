"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";

export const AdminLogin = () => {
  const { setIsAdminAuthenticated } = useShop();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAdminAuthenticated(true);
    } else {
      setError("ভুল তথ্য। অনুগ্রহ করে admin:admin ব্যবহার করুন");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black">
        <h2 className="mb-6 text-2xl font-bold text-center">অ্যাডমিন লগইন</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              ব্যবহারকারীর নাম
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-700 dark:bg-neutral-900"
              placeholder="admin"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            লগইন
          </button>
        </form>
      </div>
    </div>
  );
};

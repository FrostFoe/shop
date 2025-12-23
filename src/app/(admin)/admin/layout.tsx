"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-black dark:text-white">
      <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" /> স্টোরে ফিরে যান
          </Link>
          <h1 className="text-xl font-bold">অ্যাডমিন প্যানেল</h1>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

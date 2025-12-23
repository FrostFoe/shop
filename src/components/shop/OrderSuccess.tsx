import React from "react";
import Link from "next/link";

export const OrderSuccess = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6 dark:bg-green-900/30">
        <svg
          className="h-12 w-12 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="mb-2 text-3xl font-bold">আপনার অর্ডারের জন্য ধন্যবাদ!</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">
        আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আপনি একটি ইমেল কনফার্মেশন পাবেন।
      </p>
      <Link
        href="/"
        className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        কেনাকাটা চালিয়ে যান
      </Link>
    </div>
  );
};

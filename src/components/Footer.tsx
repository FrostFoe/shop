"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <a
            className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
            href="#"
          >
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[30px] w-[30px] rounded-lg">
              <LogoIcon className="h-4 w-4 fill-black dark:fill-white h-[10px] w-[10px]" />
            </div>
            <span className="uppercase">একমি স্টোর</span>
          </a>
        </div>
        <nav>
          <ul>
            {[
              "হোম",
              "আমাদের সম্পর্কে",
              "শর্তাবলী",
              "শিপিং এবং রিটার্ন পলিসি",
              "গোপনীয়তা নীতি",
              "জিজ্ঞাসিত প্রশ্ন",
            ].map((item) => (
              <li key={item}>
                <a
                  className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>© ২০২৩-২০২৫ একমি, ইনক. সর্বস্বত্ব সংরক্ষিত।</p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>
            <Link
              href="/admin"
              className="hover:underline hover:text-black dark:hover:text-white"
            >
              অ্যাডমিন
            </Link>
          </p>
          <p className="md:ml-auto">
            <a href="#" className="text-black dark:text-white">
              তৈরি করেছেন ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

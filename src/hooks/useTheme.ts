"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("dark-mode", false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
}

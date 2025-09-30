"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      className=" px-4 py-2 rounded-full border border-black/10 dark:border-white/10
                 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm cursor-pointer"
      title="Switch theme"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

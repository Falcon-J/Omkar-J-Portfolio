"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Dark theme"
      aria-pressed={mounted ? isDark : undefined}
      className="inline-flex h-11 w-11 items-center justify-center rounded text-text-muted transition-colors hover:bg-surface-muted hover:text-primary"
    >
      {isDark ? <Moon aria-hidden className="h-5 w-5" /> : <Sun aria-hidden className="h-5 w-5" />}
    </button>
  );
}

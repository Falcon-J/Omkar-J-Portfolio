"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Hook to get theme-aware values
 * Useful for components that need different behavior based on theme
 */
export function useThemeValues<T>(lightValue: T, darkValue: T): T {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return lightValue; // Default to light theme during SSR
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  return currentTheme === "dark" ? darkValue : lightValue;
}

/**
 * Hook to get current theme status
 */
export function useThemeStatus() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const isLight = currentTheme === "light";
  const isSystem = theme === "system";

  return {
    isDark,
    isLight,
    isSystem,
    currentTheme,
    mounted,
  };
}

/**
 * Component that renders different content based on theme
 */
interface ThemeAwareProps {
  light: React.ReactNode;
  dark: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ThemeAware({ light, dark, fallback = light }: ThemeAwareProps) {
  const { mounted, isDark } = useThemeStatus();

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{isDark ? dark : light}</>;
}

/**
 * Hook for theme-aware animations and canvas
 */
export function useThemeColors() {
  const { mounted, isDark } = useThemeStatus();

  const colors = {
    // Primary brand colors with better contrast
    navy: isDark ? "hsl(210, 70%, 85%)" : "hsl(213, 75%, 21%)",
    cream: isDark ? "hsl(213, 35%, 6%)" : "hsl(40, 25%, 94%)",
    beige: isDark ? "hsl(213, 25%, 12%)" : "hsl(33, 13%, 79%)",
    almostBlack: isDark ? "hsl(40, 20%, 98%)" : "hsl(0, 0%, 1%)",

    // Surface colors with better visibility
    surface: isDark ? "hsl(213, 30%, 9%)" : "hsl(40, 30%, 97%)",
    surfaceElevated: isDark ? "hsl(213, 20%, 15%)" : "hsl(0, 0%, 100%)",

    // RGB versions for canvas with improved contrast
    navyRgb: isDark ? "rgb(178, 206, 235)" : "rgb(18, 52, 88)",
    creamRgb: isDark ? "rgb(14, 20, 30)" : "rgb(241, 239, 236)",
    textRgb: isDark ? "rgb(248, 246, 243)" : "rgb(18, 52, 88)",

    // HSL channels for rgba usage with better opacity
    navyHsl: isDark ? "210, 70%, 85%" : "213, 75%, 21%",
    creamHsl: isDark ? "213, 35%, 6%" : "40, 25%, 94%",
    textHsl: isDark ? "40, 20%, 98%" : "213, 75%, 21%",
  };

  return { colors, mounted, isDark };
}

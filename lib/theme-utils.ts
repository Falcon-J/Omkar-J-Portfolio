/**
 * Color Migration Utility
 * Provides helper functions to gradually migrate from hardcoded colors to theme-aware colors
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Theme-aware color mappings
 * Maps legacy color classes to new theme-aware classes
 */
export const colorMigrationMap = {
  // Text Colors
  "text-navy": "text-portfolio-navy",
  "text-cream": "text-portfolio-cream",
  "text-beige": "text-portfolio-beige",
  "text-almost-black": "text-portfolio-almost-black",
  "text-white":
    "text-portfolio-surface-elevated dark:text-portfolio-almost-black",

  // Background Colors
  "bg-navy": "bg-portfolio-navy",
  "bg-cream": "bg-portfolio-cream",
  "bg-beige": "bg-portfolio-beige",
  "bg-almost-black": "bg-portfolio-almost-black",
  "bg-white": "bg-portfolio-surface-elevated",
  "bg-white/80": "bg-portfolio-surface-elevated/80",
  "bg-white/30": "bg-portfolio-surface-elevated/30",

  // Border Colors
  "border-navy": "border-portfolio-navy",
  "border-navy/10": "border-portfolio-navy/10",
  "border-navy/20": "border-portfolio-navy/20",
  "border-white/20": "border-portfolio-surface-elevated/20",

  // Hover States
  "hover:bg-navy/5": "hover:bg-portfolio-surface/50",
  "hover:bg-navy/90": "hover:bg-portfolio-navy-dark",
  "hover:text-navy": "hover:text-portfolio-navy",
} as const;

/**
 * Helper function to get theme-aware color class
 * @param legacyClass - The original color class
 * @returns Theme-aware color class
 */
export function getThemeAwareColor(
  legacyClass: keyof typeof colorMigrationMap
): string {
  return colorMigrationMap[legacyClass] || legacyClass;
}

/**
 * Helper function to convert multiple legacy classes to theme-aware classes
 * @param classes - Array of class names or space-separated string
 * @returns Theme-aware classes string
 */
export function migrateColorClasses(classes: string | string[]): string {
  const classArray = typeof classes === "string" ? classes.split(" ") : classes;

  return classArray
    .map((cls) => {
      // Check if it's a color class that needs migration
      if (cls in colorMigrationMap) {
        return getThemeAwareColor(cls as keyof typeof colorMigrationMap);
      }
      return cls;
    })
    .join(" ");
}

/**
 * Extended cn function that also handles color migration
 * @param inputs - Class values that may include legacy color classes
 * @returns Merged classes with theme-aware colors
 */
export function cnWithTheme(...inputs: ClassValue[]): string {
  const mergedClasses = cn(...inputs);
  return migrateColorClasses(mergedClasses);
}

/**
 * Predefined theme-aware component styles
 */
export const themeStyles = {
  // Cards and containers
  card: "bg-portfolio-surface-elevated border-portfolio-navy/20 shadow-lg backdrop-blur-sm",
  cardHover: "hover:bg-portfolio-surface/80 transition-colors duration-200",

  // Buttons
  primaryButton:
    "bg-portfolio-navy text-portfolio-cream hover:bg-portfolio-navy-dark border-0",
  secondaryButton:
    "bg-portfolio-surface text-portfolio-almost-black border-portfolio-navy/30 hover:bg-portfolio-beige",

  // Text with improved contrast
  heading: "text-portfolio-almost-black font-semibold",
  subheading: "text-portfolio-almost-black/80",
  body: "text-portfolio-almost-black/90",
  muted: "text-portfolio-almost-black/70",

  // Inputs with better visibility
  input:
    "border-portfolio-navy/30 focus:border-portfolio-navy focus:ring-portfolio-navy/20 bg-portfolio-surface-elevated text-portfolio-almost-black placeholder:text-portfolio-almost-black/50",

  // Navigation
  navItem: "text-portfolio-almost-black/80 hover:text-portfolio-navy",
  activeNavItem: "text-portfolio-navy font-semibold",

  // Backgrounds
  pageBackground: "bg-portfolio-cream",
  sectionBackground: "bg-portfolio-surface/50",
  overlayBackground: "bg-portfolio-surface-elevated/95 backdrop-blur-sm",
} as const;

/**
 * Helper to get predefined theme styles
 * @param styleKey - Key from themeStyles object
 * @returns Theme-aware style classes
 */
export function getThemeStyle(styleKey: keyof typeof themeStyles): string {
  return themeStyles[styleKey];
}

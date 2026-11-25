import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: { DEFAULT: token("surface"), muted: token("surface-muted") },
        border: token("border"),
        text: { DEFAULT: token("text"), muted: token("text-muted") },
        primary: { DEFAULT: token("primary"), fg: token("primary-fg") },
        accent: token("accent"),
        success: token("success"),
        danger: token("danger"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 4vw, 2.75rem)", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.015em" }],
        h2: ["1.5rem", { lineHeight: "1.25", fontWeight: "650" }],
        h3: ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "12px",
        lg: "12px",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.2,.8,.2,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

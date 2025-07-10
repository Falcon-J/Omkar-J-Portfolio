import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omkar Jawalikar ",
  description:
    "Computer Science geek specializing in AI/ML, full-stack development, and financial research. Currently AI/ML Intern at ForgeAhead Solutions.",
  icons: {
    icon: "/favicon-terminal.svg", 
    apple: "/PFP.png", // Your profile picture for Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

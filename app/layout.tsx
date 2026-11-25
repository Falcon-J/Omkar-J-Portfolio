import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./portfolio.css";
import { VisitProvider } from "@/components/portfolio/visit-provider";
import { SiteShell } from "@/components/portfolio/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Omkar Jawalikar | Software Engineer",
  description:
    "Software engineer focused on backend systems and production AI. I build backend-heavy AI products, agentic systems, and full-stack prototypes for real-world workflows.",
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <VisitProvider>
            <SiteShell>{children}</SiteShell>
          </VisitProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

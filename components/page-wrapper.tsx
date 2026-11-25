"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  PageBackground,
  AnimatedPageBackground,
  GradientPageBackground,
} from "@/components/unified-background";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  backgroundVariant?: "default" | "animated" | "gradient";
}

export function PageWrapper({
  children,
  backgroundVariant = "default",
}: PageWrapperProps) {
  const BackgroundComponent =
    backgroundVariant === "animated"
      ? AnimatedPageBackground
      : backgroundVariant === "gradient"
      ? GradientPageBackground
      : PageBackground;

  return (
    <BackgroundComponent>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </BackgroundComponent>
  );
}

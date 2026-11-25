"use client";

import { motion } from "framer-motion";
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
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        {children}
        <Footer />
      </motion.main>
    </BackgroundComponent>
  );
}

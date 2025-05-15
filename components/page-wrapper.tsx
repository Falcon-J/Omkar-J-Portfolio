"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { ReactNode } from "react";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  text-almost-black">
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
    </div>
  );
}

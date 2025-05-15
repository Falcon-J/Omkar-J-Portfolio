"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IconRevealProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function IconReveal({ icon, title, description }: IconRevealProps) {
  return (
    <div className="group relative h-24 w-24 mx-auto">
      {/* Icon container - always visible */}
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 bg-[var(--color-primary)]/10 rounded-full group-hover:scale-90">
        {icon}
      </div>
      
      {/* Text container - visible only on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-[var(--color-light)] rounded-lg shadow-md scale-50 group-hover:scale-110 p-2">
        <h3 className="font-semibold text-sm text-[var(--color-primary)] mb-1">{title}</h3>
        <p className="text-xs text-[var(--color-secondary)] text-center">{description}</p>
      </div>
    </div>
  );
}
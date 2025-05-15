"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FlipCardProps {
  frontIcon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FlipCard({
  frontIcon,
  title,
  description,
  delay = 0,
}: FlipCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      rotateY: isInView ? [0, 180, 0] : 0,
      y: 0,
      transition: {
        opacity: { duration: 0.5, delay },
        y: { duration: 0.5, delay },
        rotateY: {
          duration: 1.2,
          delay: delay + 0.2,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 
        transition-all p-6 rounded-lg text-center group perspective"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: "1000px" }}
    >
      <div
        className="mx-auto w-16 h-16 flex items-center justify-center 
        bg-[var(--color-primary)]/10 rounded-full mb-4 
        group-hover:bg-[var(--color-primary)]/20 transition-all"
      >
        {frontIcon}
      </div>
      <h3 className="font-semibold text-xl mb-2 text-[var(--color-primary)]">
        {title}
      </h3>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
}

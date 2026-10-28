"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./journal.module.css";

export function ScrollRow({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const row = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const element = row.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth * .85, behavior: "auto" });
  };
  return <><div ref={row} className={className} tabIndex={0} role="region" aria-label={label}>{children}</div><div className={styles.rowControls}><button type="button" aria-label={`Previous ${label}`} onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /></button><span>Swipe or scroll to explore</span><button type="button" aria-label={`Next ${label}`} onClick={() => move(1)}><ArrowRight size={16} aria-hidden="true" /></button></div></>;
}

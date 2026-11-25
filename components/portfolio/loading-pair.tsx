"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { WalkSprite } from "./companion";
export function LoadingPair() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div className="loading-pair" role="status" ref={container}>
      <div aria-hidden="true">
        <WalkSprite active={visible && inView && !reduced} />
        <WalkSprite cat active={visible && inView && !reduced} />
      </div>
      <span className="sr-only">Loading chapter</span>
    </div>
  );
}

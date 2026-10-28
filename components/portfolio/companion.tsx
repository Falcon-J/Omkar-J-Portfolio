"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Check, Cookie } from "lucide-react";
import { useVisit } from "./visit-provider";
import { type TreatId } from "@/lib/visit-state";

type Pose = "idle" | "wave" | "point" | "sit" | "workshop";

export function Character({
  cat = false,
  pose = "idle",
  className = "",
}: {
  cat?: boolean;
  pose?: Pose;
  className?: string;
}) {
  const { state } = useVisit();
  const [failed, setFailed] = useState<string | null>(null);
  const source = cat
    ? "/companions/stella.png"
    : `/companions/omkar${pose === "idle" ? "" : `-${pose}`}.png`;
  const fallback = cat ? "/companions/stella.png" : "/companions/omkar.png";
  if (state.guideHidden) return null;
  if (failed === fallback)
    return (
      <span className={`character-fallback ${className}`} aria-hidden="true">
        {cat ? "🐈" : "✦"}
      </span>
    );
  return (
    <Image
      className={`character ${cat ? "cat-character" : ""} pose-${pose} ${className}`}
      src={failed === source ? fallback : source}
      width={cat || pose === "sit" ? 384 : pose === "point" ? 296 : 256}
      height={cat || pose === "sit" ? 256 : pose === "point" ? 332 : 384}
      sizes="(max-width: 700px) 160px, 200px"
      alt=""
      aria-hidden="true"
      draggable={false}
      onError={() => setFailed(failed === source ? fallback : source)}
    />
  );
}

export function WalkSprite({
  cat = false,
  active = true,
}: {
  cat?: boolean;
  active?: boolean;
}) {
  const { state } = useVisit();
  const [ready, setReady] = useState(false);
  const source = `/companions/${cat ? "stella" : "omkar"}-walk.png`;
  if (state.guideHidden) return null;
  return (
    <span
      className={`walk-sprite ${cat ? "cat-sprite" : "human-sprite"} ${ready && active && !state.guidePaused ? "sprite-active" : ""}`}
      aria-hidden="true"
      style={ready ? { backgroundImage: `url(${source})` } : undefined}
    >
      <img
        className="sprite-preload"
        src={source}
        alt=""
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
      />
      {!ready && <Character cat={cat} />}
    </span>
  );
}

export function Companion({
  rest = "idle",
  arrival = true,
  selection,
  cat = false,
  className = "",
}: {
  rest?: Pose;
  arrival?: boolean;
  selection?: number;
  cat?: boolean;
  className?: string;
}) {
  const { state } = useVisit();
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.1 });
  const [phase, setPhase] = useState<Pose | "walk">(rest);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const arrived = useRef(false);
  const previousSelection = useRef<number | undefined>(undefined);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const enabled =
    inView && visible && !state.guideHidden && !state.guidePaused && !reduced;
  useEffect(() => {
    setPhase(rest);
    if (!enabled) return;
    let settle: ReturnType<typeof setTimeout>;
    let gesture: ReturnType<typeof setTimeout>;
    const stop = () => {
      setPhase(rest);
      if (rest === "workshop") setStep(0);
    };
    const changed =
      selection !== undefined && selection !== previousSelection.current;
    if (changed) {
      const gesturePose = rest === "workshop" ? "workshop" : "point";
      setPhase(arrived.current && rest !== "workshop" ? "walk" : gesturePose);
      if (rest === "workshop") setStep(6);
      gesture = setTimeout(() => setPhase(gesturePose), 380);
      settle = setTimeout(stop, 1400);
    } else if (arrival && !arrived.current) {
      setPhase(rest === "workshop" ? "workshop" : "wave");
      settle = setTimeout(stop, 1300);
    }
    arrived.current = true;
    previousSelection.current = selection;
    const scroll = () => {
      if (document.hidden || !container.current) return;
      const bounds = container.current.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      clearTimeout(gesture);
      clearTimeout(settle);
      setPhase(rest === "workshop" ? "workshop" : "walk");
      setStep(Math.round(scrollY / 180) % 2 ? 14 : 0);
      settle = setTimeout(stop, 260);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      clearTimeout(gesture);
      clearTimeout(settle);
      window.removeEventListener("scroll", scroll);
    };
  }, [enabled, selection, rest, arrival]);
  return (
    <div
      ref={container}
      className={`context-companion ${className} ${state.guideHidden ? "guide-hidden" : ""}`}
      aria-hidden="true"
    >
      {!state.guideHidden && (
        <motion.div
          className="companion-pair"
          animate={{ x: enabled ? step : 0 }}
          transition={{ duration: enabled ? 0.25 : 0 }}
        >
          {phase === "walk" && enabled ? (
            <WalkSprite />
          ) : (
            <Character pose={phase === "walk" ? rest : phase} />
          )}
          {cat &&
            (phase === "walk" && enabled ? (
              <WalkSprite cat />
            ) : (
              <Character cat />
            ))}
        </motion.div>
      )}
    </div>
  );
}

export function Treat({ id }: { id: TreatId }) {
  const { state, dispatch } = useVisit();
  const collected = state.collected.includes(id);
  return (
    <button
      className="treat"
      onClick={() => dispatch({ type: "collect", id })}
      disabled={collected}
      aria-label={
        collected ? `${id} treat collected` : `Collect Stella's ${id} treat`
      }
    >
      {collected ? <Check size={17} /> : <Cookie size={19} />}
      <span>{collected ? "Treat collected" : "A treat for Stella"}</span>
    </button>
  );
}

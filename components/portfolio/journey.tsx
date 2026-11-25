"use client";
import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Building2, GraduationCap } from "lucide-react";
import { Companion } from "./companion";
const milestones = [
  {
    title: "2004",
    subtitle: "Born",
    heading: "The beginning",
    detail: "The start of the story, before the code and the systems.",
    x: 0,
    y: 1,
  },
  {
    title: "School",
    subtitle: "Early chapters",
    heading: "School years",
    detail: "School, then a new chapter studying computer science at VIT.",
    x: 1,
    y: 1,
  },
  {
    title: "VIT",
    subtitle: "CSE",
    heading: "Vellore Institute of Technology",
    detail:
      "B.Tech in Computer Science and Engineering, July 2026. CGPA 8.33. Campus experiences included the Entrepreneurship Cell and technology events.",
    x: 2,
    y: 1,
  },
  {
    title: "Internships",
    subtitle: "Two chapters",
    heading: "Learning through the work",
    detail:
      "ForgeAhead Solutions · AI/ML Intern · June–September 2025: job-data parsing, semantic matching, and OCR pipelines. Anarock · Software Engineering Intern · December 2025–June 2026: FastAPI services, conversational facility workflows, typed contracts, and Redis-backed context.",
    x: 3,
    y: 1,
  },
  {
    title: "Today",
    subtitle: "Anarock",
    heading: "Anarock",
    detail:
      "Software Development Engineer I · July 2026–present. Configurable editors, tenant-scoped APIs, campus discovery, mobile WebView experiences, and dependable execution boundaries for AI workflows.",
    x: 4,
    y: 1,
  },
  {
    title: "Next",
    subtitle: "Aspiration",
    heading: "Keep building",
    detail:
      "More depth, more ownership, and more dependable systems. There is plenty left to learn.",
    x: 5,
    y: 1.15,
  },
];
export function Journey() {
  const [selected, setSelected] = useState(4);
  const reduced = useReducedMotion();
  const current = milestones[selected];
  const count = milestones.length;
  const Detail = () => (
    <>
      <span className="milestone-detail-icon" aria-hidden="true">
        {selected === 2 ? <GraduationCap size={38} /> : <Building2 size={38} />}
      </span>
      <div>
        <h2>{current.heading}</h2>
        <p>{current.detail}</p>
        {selected === 3 && (
          <small>ForgeAhead dates from my earlier portfolio record.</small>
        )}
      </div>
    </>
  );
  return (
    <div
      className="journey-stage"
      style={{ "--journey-count": count } as CSSProperties}
    >
      <div className="journey-graph" aria-hidden="true">
        <ResponsiveContainer width="100%" height={130}>
          <ScatterChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[-0.5, count - 0.5]}
              hide
            />
            <YAxis type="number" dataKey="y" domain={[0, 2]} hide />
            <ZAxis range={[314, 314]} />
            <Scatter
              data={milestones.slice(0, 5)}
              line={{ stroke: "var(--p-node)", strokeWidth: 3 }}
              fill="var(--p-node)"
              isAnimationActive={false}
              onClick={(_, index) => setSelected(index)}
              cursor="pointer"
            />
            <Scatter
              data={milestones.slice(4)}
              line={{
                stroke: "var(--p-muted)",
                strokeWidth: 2,
                strokeDasharray: "8 8",
              }}
              fill="var(--p-paper)"
              stroke="var(--p-muted)"
              isAnimationActive={false}
              shape={() => <g />}
            />
            <Scatter
              data={[milestones[count - 1]]}
              fill="var(--p-paper)"
              stroke="var(--p-muted)"
              strokeWidth={2}
              strokeDasharray="4 4"
              isAnimationActive={false}
              onClick={() => setSelected(count - 1)}
              cursor="pointer"
            />
            <Scatter
              data={[current]}
              fill="var(--p-accent)"
              stroke="var(--p-ink)"
              strokeWidth={3}
              isAnimationActive={false}
              shape={(props: unknown) => {
                const { cx, cy } = props as { cx: number; cy: number };
                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={15}
                      fill="var(--p-paper)"
                      stroke="var(--p-ink)"
                      strokeWidth={2}
                    />
                    <circle cx={cx} cy={cy} r={10} fill="var(--p-accent)" />
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <motion.div
          className="journey-desktop-guide"
          animate={{ left: `${((selected + 0.5) / count) * 100}%` }}
          transition={{ duration: reduced ? 0 : 0.38, ease: "easeOut" }}
        >
          <Companion selection={selected} arrival={false} />
        </motion.div>
      </div>
      <ol className="journey-list">
        {milestones.map((milestone, index) => (
          <li
            key={milestone.title}
            className={`${selected === index ? "selected" : ""} ${index === 5 ? "future" : ""}`}
          >
            <button
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
            >
              <span className="timeline-dot" aria-hidden="true" />
              <strong>{milestone.title}</strong>
              <span>{milestone.subtitle}</span>
            </button>
            {selected === index && (
              <>
                <div className="journey-mobile-guide">
                  <Companion selection={selected} arrival={false} />
                </div>
                <div
                  className="journey-mobile-detail"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <Detail />
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
      <div
        className="journey-desktop-detail"
        id="milestone-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <Detail />
      </div>
    </div>
  );
}

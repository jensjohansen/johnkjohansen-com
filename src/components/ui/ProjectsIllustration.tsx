"use client";

import { motion, useReducedMotion } from "motion/react";

// Abstract circuit/workflow illustration for the projects section header
export function ProjectsIllustration({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const Path = prefersReducedMotion ? "path" : motion.path;
  const Circle = prefersReducedMotion ? "circle" : motion.circle;

  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="proj-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
          <stop offset="30%" stopColor="#6366f1" />
          <stop offset="70%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main circuit path */}
      <Path
        d="M0 60 L80 60 L100 30 L160 30 L180 60 L220 60 L240 90 L300 90 L320 60 L400 60"
        stroke="url(#proj-grad)"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
        {...(!prefersReducedMotion && {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 1.5, ease: "easeOut" },
        })}
      />

      {/* Secondary path */}
      <Path
        d="M40 80 L120 80 L140 60 L200 60"
        stroke="#6366f1"
        strokeWidth="0.5"
        strokeOpacity="0.15"
        fill="none"
        {...(!prefersReducedMotion && {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 1.2, delay: 0.3, ease: "easeOut" },
        })}
      />
      <Path
        d="M200 60 L260 60 L280 40 L360 40"
        stroke="#22d3ee"
        strokeWidth="0.5"
        strokeOpacity="0.15"
        fill="none"
        {...(!prefersReducedMotion && {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 1.2, delay: 0.5, ease: "easeOut" },
        })}
      />

      {/* Junction nodes */}
      {[
        { cx: 100, cy: 30 }, { cx: 160, cy: 30 },
        { cx: 180, cy: 60 }, { cx: 220, cy: 60 },
        { cx: 240, cy: 90 }, { cx: 300, cy: 90 },
        { cx: 320, cy: 60 }, { cx: 140, cy: 60 },
        { cx: 280, cy: 40 },
      ].map((n, i) => (
        <Circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="3"
          fill="#12121a"
          stroke="#6366f1"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, scale: 0 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.3, delay: 0.8 + i * 0.08 },
          })}
        />
      ))}

      {/* Traveling data pulse */}
      {!prefersReducedMotion && (
        <motion.circle
          r="2"
          fill="#22d3ee"
          opacity={0.8}
          animate={{
            cx: [0, 80, 100, 160, 180, 220, 240, 300, 320, 400],
            cy: [60, 60, 30, 30, 60, 60, 90, 90, 60, 60],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </svg>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";

// An animated constellation/network graph representing AI agent connections
export function HeroIllustration({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  const nodes = [
    { cx: 200, cy: 120, r: 6, delay: 0 },
    { cx: 320, cy: 80, r: 5, delay: 0.2 },
    { cx: 380, cy: 200, r: 7, delay: 0.1 },
    { cx: 260, cy: 260, r: 5, delay: 0.3 },
    { cx: 140, cy: 220, r: 4, delay: 0.15 },
    { cx: 100, cy: 140, r: 4, delay: 0.25 },
    { cx: 300, cy: 160, r: 8, delay: 0.05 }, // central "agent" node
    { cx: 440, cy: 120, r: 4, delay: 0.35 },
    { cx: 420, cy: 280, r: 5, delay: 0.4 },
    { cx: 180, cy: 320, r: 4, delay: 0.3 },
    { cx: 340, cy: 320, r: 4, delay: 0.45 },
    { cx: 60, cy: 280, r: 3, delay: 0.5 },
    { cx: 480, cy: 200, r: 3, delay: 0.55 },
  ];

  // Connections between nodes (index pairs)
  const edges = [
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
    [0, 1], [1, 7], [2, 7], [2, 8], [3, 8], [3, 10],
    [4, 5], [4, 11], [3, 9], [9, 10], [7, 12], [2, 12],
    [0, 5], [5, 11],
  ];

  return (
    <svg
      viewBox="0 0 540 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        const Comp = prefersReducedMotion ? "line" : motion.line;
        return (
          <Comp
            key={`edge-${i}`}
            x1={n1.cx}
            y1={n1.cy}
            x2={n2.cx}
            y2={n2.cy}
            stroke="url(#hero-grad)"
            strokeOpacity={0.15}
            strokeWidth={1}
            {...(!prefersReducedMotion && {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 1.2, delay: 0.3 + i * 0.05, ease: "easeOut" },
            })}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isCenter = i === 6;
        const Comp = prefersReducedMotion ? "g" : motion.g;
        return (
          <Comp
            key={`node-${i}`}
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, scale: 0 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: node.delay + 0.2, ease: "easeOut" },
            })}
          >
            {/* Glow */}
            {isCenter && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={24}
                fill="url(#node-glow)"
              />
            )}
            {/* Node circle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={isCenter ? "url(#hero-grad)" : "#6366f1"}
              opacity={isCenter ? 1 : 0.6}
            />
            {/* Inner dot for center */}
            {isCenter && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={3}
                fill="#fff"
                opacity={0.8}
              />
            )}
          </Comp>
        );
      })}

      {/* Decorative ring around center node */}
      {(() => {
        const Comp = prefersReducedMotion ? "circle" : motion.circle;
        return (
          <Comp
            cx={300}
            cy={160}
            r={40}
            stroke="url(#hero-grad)"
            strokeWidth={0.5}
            fill="none"
            strokeOpacity={0.3}
            strokeDasharray="4 4"
            {...(!prefersReducedMotion && {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 1, delay: 0.6, ease: "easeOut" },
            })}
          />
        );
      })()}
    </svg>
  );
}

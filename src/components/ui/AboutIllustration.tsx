"use client";

import { motion, useReducedMotion } from "motion/react";

// Abstract layered architecture diagram — represents system layers and data flow
export function AboutIllustration({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const Rect = prefersReducedMotion ? "rect" : motion.rect;
  const Path = prefersReducedMotion ? "path" : motion.path;
  const Circle = prefersReducedMotion ? "circle" : motion.circle;

  const layers = [
    { y: 40, width: 280, label: "AI Agents", opacity: 0.9 },
    { y: 100, width: 240, label: "Services", opacity: 0.7 },
    { y: 160, width: 200, label: "Platform", opacity: 0.5 },
    { y: 220, width: 160, label: "Infrastructure", opacity: 0.3 },
  ];

  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="about-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="about-grad-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Architecture layers */}
      {layers.map((layer, i) => (
        <Rect
          key={i}
          x={(360 - layer.width) / 2}
          y={layer.y}
          width={layer.width}
          height={44}
          rx={8}
          fill="#12121a"
          stroke="url(#about-grad)"
          strokeOpacity={layer.opacity * 0.4}
          strokeWidth={1}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
          })}
        />
      ))}

      {/* Layer labels */}
      {layers.map((layer, i) => (
        <text
          key={`label-${i}`}
          x={180}
          y={layer.y + 27}
          textAnchor="middle"
          className="font-mono"
          fontSize={11}
          fill="#6366f1"
          fillOpacity={layer.opacity}
        >
          {layer.label}
        </text>
      ))}

      {/* Vertical connection lines between layers */}
      {[0, 1, 2].map((i) => (
        <Path
          key={`conn-${i}`}
          d={`M180 ${layers[i].y + 44} L180 ${layers[i + 1].y}`}
          stroke="url(#about-grad)"
          strokeOpacity={0.2}
          strokeWidth={1}
          strokeDasharray="3 3"
          {...(!prefersReducedMotion && {
            initial: { pathLength: 0 },
            whileInView: { pathLength: 1 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: 0.6 + i * 0.15, ease: "easeOut" },
          })}
        />
      ))}

      {/* Data flow dots travelling down */}
      {[0, 1, 2].map((i) => (
        <Circle
          key={`dot-${i}`}
          cx={180}
          cy={layers[i].y + 50}
          r={2}
          fill="#22d3ee"
          {...(!prefersReducedMotion && {
            animate: {
              cy: [layers[i].y + 44, layers[i + 1].y],
              opacity: [1, 0.3],
            },
            transition: {
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          })}
        />
      ))}

      {/* Side decorative nodes */}
      {[
        { cx: 70, cy: 62, r: 3 },
        { cx: 56, cy: 122, r: 2.5 },
        { cx: 90, cy: 182, r: 2 },
        { cx: 290, cy: 62, r: 3 },
        { cx: 304, cy: 122, r: 2.5 },
        { cx: 270, cy: 182, r: 2 },
      ].map((n, i) => (
        <Circle
          key={`side-${i}`}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="#6366f1"
          fillOpacity={0.4}
          {...(!prefersReducedMotion && {
            initial: { opacity: 0, scale: 0 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.3, delay: 0.8 + i * 0.1 },
          })}
        />
      ))}

      {/* Lines from side nodes to layers */}
      {[
        "M70 62 L40 62",
        "M290 62 L320 62",
        "M56 122 L60 122",
        "M304 122 L300 122",
      ].map((d, i) => (
        <path
          key={`side-line-${i}`}
          d={d}
          stroke="#6366f1"
          strokeOpacity={0.15}
          strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}

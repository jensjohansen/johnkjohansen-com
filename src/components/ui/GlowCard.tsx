"use client";

import type { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export function GlowCard({ children, className = "", featured }: GlowCardProps) {
  return (
    <div
      className={`glow-card p-6 md:p-8 ${
        featured ? "border-accent/30 ring-1 ring-accent/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

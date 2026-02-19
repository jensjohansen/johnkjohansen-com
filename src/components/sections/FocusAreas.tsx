"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import {
  AgentIllustration,
  ArchitectureIllustration,
  DataIllustration,
  LeadershipIllustration,
} from "@/components/ui/FocusIllustrations";
import { FOCUS_AREAS } from "@/lib/constants";

const FOCUS_ILLUSTRATIONS = [
  AgentIllustration,
  ArchitectureIllustration,
  DataIllustration,
  LeadershipIllustration,
];

export function FocusAreas() {
  return (
    <section id="focus" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="mb-2 font-mono text-sm text-accent">// focus areas</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What I Work On
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FOCUS_AREAS.map((area, i) => {
            const Illustration = FOCUS_ILLUSTRATIONS[i];
            return (
              <RevealOnScroll key={area.title} delay={i * 0.1}>
                <GlowCard featured={area.featured} className="h-full">
                  {/* Mini illustration */}
                  <div className="mb-4">
                    <Illustration className="h-16 w-full opacity-60" />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        area.featured ? "bg-accent/20" : "bg-white/5"
                      }`}
                    >
                      <area.icon
                        className={`h-5 w-5 ${
                          area.featured ? "text-accent" : "text-muted"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{area.title}</h3>
                    {area.featured && (
                      <Badge variant="accent">Featured</Badge>
                    )}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </GlowCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

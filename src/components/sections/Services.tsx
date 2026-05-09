"use client";

import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="mb-2 font-mono text-sm text-accent">// engineering advisory</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How I Work With You
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Four services across the startup lifecycle — from pre-seed technical co-founding through
            post-Series B transformation. All backed by 40+ years of engineering judgment and
            AI-accelerated delivery.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.slug} delay={i * 0.1}>
              <a
                href={`/services/${service.slug}`}
                className="block h-full group"
                aria-label={`Learn more about ${service.title}`}
              >
                <GlowCard featured={service.featured} className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      {service.featured && (
                        <Badge variant="accent">Most Requested</Badge>
                      )}
                    </div>
                    <p className="mb-4 text-sm font-medium text-accent/80">
                      {service.tagline}
                    </p>
                    <p className="mb-5 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                    <div className="mb-5 rounded-lg bg-white/[0.03] border border-card-border p-3">
                      <p className="text-xs text-muted mb-0.5">When to reach out:</p>
                      <p className="text-sm text-foreground/80 italic">&ldquo;{service.targetSignal}&rdquo;</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-end justify-between border-t border-card-border pt-5">
                    <div>
                      <p className="text-base font-semibold text-foreground">{service.price}</p>
                      <p className="text-xs text-muted">{service.priceNote}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </GlowCard>
              </a>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="mt-12 rounded-xl border border-card-border bg-card/30 p-6 md:p-8">
            <p className="font-mono text-sm text-accent mb-2">// the shared differentiator</p>
            <p className="text-sm leading-relaxed text-muted max-w-3xl">
              Every engagement is backed by the same combination: 40+ years of software engineering,
              25 years of engineering management, and{" "}
              <a
                href="https://github.com/jensjohansen/kaigents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                Kaigents
              </a>{" "}
              — a production-grade AI agent platform I built and run. This is engineering
              judgment backed by deployed infrastructure, not AI consulting backed by slide decks.
              The value equation: $300K–$500K quality of output at $30K–$75K engagement cost.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

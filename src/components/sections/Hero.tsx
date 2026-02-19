"use client";

import { ArrowDown, ExternalLink } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GradientText } from "@/components/ui/GradientText";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Illustration above on mobile, beside on desktop */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
        {/* Mono label */}
        <AnimatedText delay={0.1}>
          <p className="mb-6 font-mono text-sm tracking-wide text-muted">
            {HERO.monoLabel}
          </p>
        </AnimatedText>

        {/* Heading */}
        <AnimatedText delay={0.2}>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {HERO.headingPrefix}
            <GradientText>{HERO.headingGradient}</GradientText>
            {HERO.headingSuffix}
          </h1>
        </AnimatedText>

        {/* Subtitle */}
        <AnimatedText delay={0.4}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {HERO.subtitle}
          </p>
        </AnimatedText>

        {/* CTAs */}
        <AnimatedText delay={0.6}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={HERO.ctaPrimary.href}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              {HERO.ctaPrimary.label}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={HERO.ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-card-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {HERO.ctaSecondary.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </AnimatedText>
          </div>

          {/* Hero illustration */}
          <AnimatedText delay={0.3} className="hidden w-full max-w-md flex-shrink-0 lg:block">
            <HeroIllustration className="w-full opacity-80" />
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tech Stack Transformation — John K Johansen",
  description:
    "Two-phase legacy modernization at a fraction of Big Four consulting cost. Phase 1: $7,500 architecture audit. Phase 2: AI-accelerated execution, milestone-gated.",
};

const PAIN_SIGNALS = [
  "Infrastructure costs are growing faster than revenue",
  "Engineering team spending 30–40% of time on maintenance rather than features",
  "New engineers take 4–6 months to become productive",
  "You're hiring DevOps or SRE headcount primarily to hold the current system together",
  "Every new feature requires touching multiple services that shouldn't be related",
  "The last incident post-mortem pointed to architectural root causes, not operator error",
];

const PHASE1_DELIVERABLES = [
  "Full assessment of the current tech stack: services, dependencies, infrastructure, data stores, deployment pipeline, and security posture",
  "Identification of the top three cost and scaling risks with quantified impact estimates",
  "A proposed simpler architecture with lower TCO and higher scalability — with a written rationale for every major change",
  "A build-vs-buy analysis for components where commercial solutions outperform custom builds",
  "A transformation roadmap with phase-gated milestones, effort estimates, and costs",
  "This deliverable is yours regardless of whether you proceed to Phase 2",
];

const PHASE2_APPROACH = [
  "Execution of the transformation roadmap from Phase 1 — no redesign, no renegotiation of scope",
  "Milestone-based delivery: each phase has a defined scope, a demo/handover point, and a go/no-go decision before the next phase begins",
  "AI-accelerated implementation of infrastructure migration, service refactoring, and pipeline modernization",
  "Engineering team enablement throughout — the goal is a team that owns the new architecture at completion, not an ongoing engagement dependency",
  "Parallel operation during transition where risk requires it — no big-bang cutover",
];

const WHY_NOT_BIG_FOUR = [
  {
    them: "Partnership revenue shapes the recommendation",
    us: "No vendor partnerships. The recommendation is the architecture that solves the problem.",
  },
  {
    them: "Team of associates with a senior partner on slide reviews",
    us: "Principal-level work throughout. No associates learning on your budget.",
  },
  {
    them: "200-page report delivered 6 months later",
    us: "Phase 1 is 3–4 weeks. Actionable output from week one.",
  },
  {
    them: "$500K–$2M engagement cost",
    us: "$7,500 for Phase 1. Phase 2 at $8K–$15K/month, milestone-gated.",
  },
];

export default function TechTransformationPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <a
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </a>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="orb orb-1 opacity-10" />
            <div className="orb orb-2 opacity-10" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6">
            <p className="mb-4 font-mono text-sm text-accent">// tech stack transformation</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Simpler Architecture.{" "}
              <GradientText>Lower Cost. Higher Scale.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Growing companies accumulate technical debt until infrastructure costs run ahead of
              revenue and engineering velocity collapses. This is an engineering-first transformation
              at a fraction of Big Four consulting cost — because the work is done by a principal,
              not handed off to associates.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
              >
                Start with Phase 1
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="text-sm text-muted">
                <span className="font-semibold text-foreground">$7,500 audit</span>
                {" + "}
                <span className="font-semibold text-foreground">$8K–$15K/month execution</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pain signals */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// is this for me?</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                The signals that say you need this
              </h2>
            </RevealOnScroll>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {PAIN_SIGNALS.map((signal, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3 rounded-xl border border-card-border bg-card/30 p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{signal}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.35}>
              <div className="mt-6 rounded-xl border border-card-border/50 bg-white/[0.02] p-5">
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">Target stage:</span>{" "}
                  Post-Series B through growth-stage. Engineering teams of 15–100. The company
                  is generating revenue, the product works, and the architecture is now the
                  constraint rather than the enabler.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Two phases */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// how it works</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Two Phases</h2>
              <p className="mt-3 max-w-xl text-muted">
                Phase 1 is a fixed-scope audit and roadmap. Phase 2 is execution.
                You are never committed to Phase 2 — Phase 1 stands alone.
              </p>
            </RevealOnScroll>
            <div className="mt-10 space-y-6">
              <RevealOnScroll delay={0.1}>
                <GlowCard featured>
                  <div className="flex flex-wrap items-start gap-4 justify-between mb-5">
                    <div>
                      <p className="mb-1 font-mono text-sm text-accent">// phase 1</p>
                      <h3 className="text-xl font-semibold">Architecture Audit</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$7,500</p>
                      <p className="text-sm text-muted">fixed fee · 3–4 weeks</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {PHASE1_DELIVERABLES.map((item, i) => (
                      <div key={i} className="flex gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <p className="text-sm leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <GlowCard>
                  <div className="flex flex-wrap items-start gap-4 justify-between mb-5">
                    <div>
                      <p className="mb-1 font-mono text-sm text-muted">// phase 2</p>
                      <h3 className="text-xl font-semibold">Transformation Execution</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$8K–$15K / month</p>
                      <p className="text-sm text-muted">phase-gated · milestone-based</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {PHASE2_APPROACH.map((item, i) => (
                      <div key={i} className="flex gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
                        <p className="text-sm leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Why not Big Four */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// the difference</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Why Not a Big Four Firm?
              </h2>
            </RevealOnScroll>
            <div className="mt-8 overflow-hidden rounded-xl border border-card-border">
              <div className="grid grid-cols-2 border-b border-card-border bg-card/50">
                <div className="p-4 font-mono text-xs text-muted">big four approach</div>
                <div className="border-l border-card-border p-4 font-mono text-xs text-accent">
                  this practice
                </div>
              </div>
              {WHY_NOT_BIG_FOUR.map((row, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div
                    className={`grid grid-cols-2 ${
                      i < WHY_NOT_BIG_FOUR.length - 1 ? "border-b border-card-border" : ""
                    }`}
                  >
                    <div className="p-4 text-sm text-muted">{row.them}</div>
                    <div className="border-l border-card-border p-4 text-sm text-foreground">
                      {row.us}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Tags */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <div className="flex flex-wrap gap-2">
                {["Post-Series B", "Legacy Modernization", "TCO Reduction", "Kubernetes", "Architecture", "Phase-Gated", "AI-Accelerated"].map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Phase 1 starts with a{" "}
                <GradientText>one-hour scoping call</GradientText>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                No cost for the initial scoping call. If the situation fits — infrastructure costs
                running ahead of revenue, engineering velocity declining — Phase 1 begins
                immediately with a signed statement of work.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
                >
                  Book the Scoping Call
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="/#services"
                  className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-8 py-4 font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  See All Services
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

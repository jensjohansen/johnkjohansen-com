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
  title: "Fractional CTO Retainer — John K Johansen",
  description:
    "Senior engineering leadership for Series A–C companies. Hands-on architectural guidance, team mentorship, and board-level technical communication — without the full-time overhead.",
};

const INCLUDED = [
  "2–4 days/month of direct engagement: architecture reviews, team leadership sessions, investor/board technical preparation",
  "On-call technical judgment: async, same-day response on critical architecture and hiring decisions",
  "Architectural Decision Records (ADRs) documenting key choices and rationale for future engineering leads",
  "Engineering team structure and hiring plan input — including interview participation for senior roles",
  "Technical due diligence documentation for fundraising rounds",
  "Direct access to Kaigents for AI agent team evaluation and deployment when relevant to your product",
];

const NOT_INCLUDED = [
  "Full-time availability — this is a fractional role with a maximum of 2 active retainer clients",
  "People management of the engineering team (advisory and guidance only, not line management)",
  "Product roadmap ownership — that remains with the CEO and CPO",
  "Implementation work — unless scoped separately as an MVP Build engagement",
];

const SIGNALS = [
  "Your technical co-founder is maxed out and engineering decisions are slipping",
  "You're 3–6 months from a fundraising round and need technical due diligence prep",
  "Your first CTO just departed and you have a gap to bridge",
  "The engineering team is making architectural decisions that will be expensive to unwind",
  "Investors have asked about your technical leadership and you don't have a good answer",
];

export default function FractionalCTOPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Back nav */}
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
            <p className="mb-4 font-mono text-sm text-accent">// fractional cto retainer</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Senior Engineering Leadership{" "}
              <GradientText>Without the Full-Time Overhead</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Series A–C companies need CTO-level thinking but can&apos;t justify a $400K–$600K
              full-time hire. I provide hands-on architectural guidance, direct team mentorship,
              and board-level technical communication on a retainer that scales with what you
              actually need.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
              >
                Start a Conversation
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="text-sm text-muted">
                <span className="font-semibold text-foreground">$6K–$10K / month</span>
                {" · "}3-month minimum
              </div>
            </div>
          </div>
        </section>

        {/* Is this for me */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// is this for me?</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                You&apos;re the right fit if…
              </h2>
            </RevealOnScroll>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {SIGNALS.map((signal, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3 rounded-xl border border-card-border bg-card/30 p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{signal}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.3}>
              <div className="mt-6 rounded-xl border border-card-border/50 bg-white/[0.02] p-5">
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">Best fit stage:</span>{" "}
                  Series A through Series C, 5–50 engineers. Strongest match in AI/ML, SaaS, IoT,
                  and developer-facing products. Deep domain specialties (biotech, finance) are
                  not a fit.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// what you get</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What&apos;s Included</h2>
            </RevealOnScroll>
            <div className="mt-8 space-y-3">
              {INCLUDED.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{item}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.3}>
              <div className="mt-10">
                <p className="mb-4 font-mono text-sm text-muted">// what&apos;s not included</p>
                <div className="space-y-2">
                  {NOT_INCLUDED.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted" />
                      <p className="text-sm leading-relaxed text-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// how it works</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                The Engagement Model
              </h2>
            </RevealOnScroll>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Fit Conversation",
                  description:
                    "A 30-minute no-cost call to assess whether the engagement makes sense for both sides. No deck. No sales process.",
                },
                {
                  step: "02",
                  title: "Technical Due Diligence",
                  description:
                    "A one-session deep dive ($2,500 fixed) that produces a written assessment of the engineering state, top three risks, and a proposed retainer scope.",
                },
                {
                  step: "03",
                  title: "Retainer Engagement",
                  description:
                    "3-month minimum commitment at the agreed scope and fee. Month-to-month after that. You can scale up, scale down, or transition to a full-time hire at any time.",
                },
              ].map((phase, i) => (
                <RevealOnScroll key={phase.step} delay={i * 0.1}>
                  <GlowCard className="h-full">
                    <p className="mb-3 font-mono text-2xl font-bold text-accent/40">
                      {phase.step}
                    </p>
                    <h3 className="mb-2 font-semibold">{phase.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{phase.description}</p>
                  </GlowCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <GlowCard featured className="max-w-lg">
                <p className="mb-1 font-mono text-sm text-accent">// pricing</p>
                <h2 className="text-2xl font-bold">Fractional CTO Retainer</h2>
                <div className="my-6 border-t border-card-border pt-6">
                  <p className="text-3xl font-bold">
                    $6,000–$10,000
                    <span className="ml-1 text-base font-normal text-muted">/ month</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    3-month minimum · then month-to-month
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted">
                  <p>+ $2,500 one-time technical due diligence session (required before retainer)</p>
                  <p>Capacity: maximum 2 active retainer clients simultaneously</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="accent">Series A–C</Badge>
                  <Badge>Architecture</Badge>
                  <Badge>Team Leadership</Badge>
                  <Badge>Board Prep</Badge>
                </div>
              </GlowCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to talk about the{" "}
                <GradientText>engineering state</GradientText>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                The first conversation is 30 minutes and costs nothing. If it&apos;s not a fit,
                you&apos;ll know immediately — and I&apos;ll tell you why.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
                >
                  Start the Conversation
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

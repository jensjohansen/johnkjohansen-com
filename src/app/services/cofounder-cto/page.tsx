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
  title: "Co-founder CTO — John K Johansen",
  description:
    "Technical co-founder for serial entrepreneurs building their next venture. Architecture, MVP build, and launch scaling — backed by 40+ years of engineering judgment and AI-accelerated delivery.",
};

const EQUITY_PATH = [
  "2–4% equity (negotiated based on stage, funding, and scope)",
  "$2,500/month cash to keep the engagement sustainable through pre-revenue phase",
  "Architecture design and full MVP build using AI-accelerated development",
  "Technical hiring: specification, sourcing support, and interview participation",
  "Series A technical due diligence preparation",
  "90 days post-launch advisory included",
];

const FIXED_PATH = [
  "$25,000–$40,000 fixed fee for a complete, production-ready MVP",
  "Full ownership and codebase transferred at delivery",
  "90 days of post-delivery advisory at no additional cost",
  "Option to transition to Fractional CTO Retainer after the advisory window",
  "Same AI-accelerated delivery, same senior architectural judgment",
];

const LAUNCH_SCALING = [
  "Series A technical architecture hardening and security posture review",
  "Engineering team structure design and first senior hire specification",
  "Investor technical due diligence support and documentation",
  "Technical roadmap for scale: from launch through 100K users",
];

const SERIAL_SIGNALS = [
  "You have at least one prior venture that launched and generated revenue (or was acquired)",
  "You have a validated concept — customers have said they would pay, or have paid",
  "You need an architect who can make the build decisions, not just execute them",
  "You don't want a dev shop that builds what you specify without telling you when the spec is wrong",
  "You are building a software product (SaaS, marketplace, developer tool, AI product)",
];

export default function CofounderCTOPage() {
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
            <p className="mb-4 font-mono text-sm text-accent">// co-founder cto</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The Technical Co-founder{" "}
              <GradientText>Serial Entrepreneurs Actually Need</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              You&apos;ve built and sold before. You know what a validated market looks like.
              What you need is a technical co-founder who can architect and build the product
              without requiring you to manage the engineering decisions — and who has the
              experience to know when your roadmap is wrong.
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
                <span className="font-semibold text-foreground">Equity or fixed-fee</span>
                {" · "}serial founders only
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
            <div className="mt-8 space-y-3">
              {SERIAL_SIGNALS.map((signal, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{signal}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.3}>
              <div className="mt-6 rounded-xl border border-card-border/50 bg-white/[0.02] p-5">
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">Hard requirement:</span>{" "}
                  This service is for serial entrepreneurs — founders with at least one prior
                  venture that launched and generated revenue or was acquired. First-time founders
                  without a prior exit or a live revenue-generating business are not a fit.
                  This is not gatekeeping — it is alignment. The co-founder relationship requires
                  a founder who knows what they are building and why.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Two paths */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// what you get</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Two Engagement Paths</h2>
              <p className="mt-3 text-muted">
                Both paths deliver the same quality. Choose based on your preference for
                long-term alignment vs. clean project boundaries.
              </p>
            </RevealOnScroll>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <RevealOnScroll delay={0.1}>
                <GlowCard featured className="h-full">
                  <p className="mb-3 font-mono text-sm text-accent">// path 01</p>
                  <h3 className="mb-1 text-lg font-semibold">Equity Path</h3>
                  <p className="mb-1 text-2xl font-bold">2–4% equity</p>
                  <p className="mb-5 text-sm text-muted">+ $2,500/month cash</p>
                  <div className="space-y-2.5">
                    {EQUITY_PATH.map((item, i) => (
                      <div key={i} className="flex gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <p className="text-sm leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <GlowCard className="h-full">
                  <p className="mb-3 font-mono text-sm text-muted">// path 02</p>
                  <h3 className="mb-1 text-lg font-semibold">Fixed Build Path</h3>
                  <p className="mb-1 text-2xl font-bold">$25K–$40K</p>
                  <p className="mb-5 text-sm text-muted">fixed fee · full ownership transferred</p>
                  <div className="space-y-2.5">
                    {FIXED_PATH.map((item, i) => (
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

        {/* Launch Scaling */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// second offering</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Launch Scaling</h2>
              <p className="mt-3 max-w-xl text-muted">
                After MVP launch — when the product has revenue and the team is growing —
                the engagement can extend into Series A preparation and scale architecture.
              </p>
            </RevealOnScroll>
            <div className="mt-8 space-y-3">
              {LAUNCH_SCALING.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{item}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll delay={0.3}>
              <p className="mt-4 text-sm text-muted">
                Launch Scaling is priced as an extension of the equity-path engagement, or
                as a Fractional CTO Retainer for fixed-build-path founders.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// how it works</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                From Conversation to Launch
              </h2>
            </RevealOnScroll>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Fit Conversation",
                  description:
                    "A 45-minute call covering the venture thesis, your prior experience, the product scope, and the timeline. No cost. Clear mutual assessment of fit.",
                },
                {
                  step: "02",
                  title: "Architecture Discovery Sprint",
                  description:
                    "A 2-week sprint ($3,500 fixed) that produces a tech stack recommendation, build scope, and project timeline — before any equity or retainer commitment.",
                },
                {
                  step: "03",
                  title: "Build and Launch",
                  description:
                    "Co-founder CTO engagement begins: architecture, AI-accelerated build, team building, and launch. Followed by Launch Scaling if the venture reaches that stage.",
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

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Building something{" "}
                <GradientText>worth co-founding</GradientText>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                The fit conversation is 45 minutes and costs nothing. If the prior exit and
                validated concept are there, we can move to a discovery sprint within a week.
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

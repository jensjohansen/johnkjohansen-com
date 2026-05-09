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
  title: "AI-Accelerated MVP Build — John K Johansen",
  description:
    "Production-ready software in 6–10 weeks. $25K–$45K fixed fee. Senior architectural judgment with AI-accelerated delivery — at a fraction of traditional dev shop cost.",
};

const WHAT_WORKING_MEANS = [
  "Deployed to a real environment — not a local demo or a staging instance no one can reach",
  "Automated tests with meaningful coverage, not 'it worked in my terminal'",
  "Deployment documentation sufficient for a second engineer to take over without you",
  "30-day post-delivery support window included in the fixed fee",
  "Codebase you own outright — no vendor lock-in, no ongoing dependency on this practice",
];

const ACCELERATION_STORY = [
  {
    label: "What AI accelerates",
    items: [
      "Scaffolding, boilerplate, and project structure",
      "Integration plumbing (auth, database connectors, API clients)",
      "Test generation and coverage scaffolding",
      "First-draft implementations of well-understood patterns",
    ],
  },
  {
    label: "What senior judgment handles",
    items: [
      "Architecture decisions that compound into expensive problems",
      "Security posture and threat model",
      "Data model design and migration strategy",
      "Edge cases and failure modes that AI tooling misses",
    ],
  },
];

const PAYMENT_MILESTONES = [
  { pct: "30%", label: "At start", description: "Signed specification, agreed tech stack, project kickoff" },
  { pct: "40%", label: "Mid-point demo", description: "Working core functionality deployed to staging" },
  { pct: "30%", label: "Delivery", description: "Production deployment, docs, 30-day support window begins" },
];

export default function MVPBuildPage() {
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
            <p className="mb-4 font-mono text-sm text-accent">// ai-accelerated mvp build</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Production-Ready Software.{" "}
              <GradientText>Not a Prototype.</GradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Traditional dev shops charge $150K–$300K and take 6–12 months. AI-accelerated
              senior engineering changes the equation. You get the same quality of architectural
              judgment and a production-ready product — in 6–10 weeks at a fraction of the cost.
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
                <span className="font-semibold text-foreground">$25K–$45K fixed fee</span>
                {" · "}6–10 weeks
              </div>
            </div>
          </div>
        </section>

        {/* What "working" means */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// what you get</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                What &ldquo;Working&rdquo; Actually Means
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                The deliverable is not a prototype or a demo. It is the product you put in front
                of your first customers.
              </p>
            </RevealOnScroll>
            <div className="mt-8 space-y-3">
              {WHAT_WORKING_MEANS.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted">{item}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* AI acceleration story */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll>
              <p className="mb-2 font-mono text-sm text-accent">// the acceleration model</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Why It Costs Less Without Cutting Corners
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                The equivalent work from a senior engineering firm would cost $300K+. The cost
                here is lower because the mechanical work is AI-accelerated — but the judgment
                work is not.
              </p>
            </RevealOnScroll>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {ACCELERATION_STORY.map((group, i) => (
                <RevealOnScroll key={group.label} delay={i * 0.1}>
                  <GlowCard featured={i === 0} className="h-full">
                    <p className="mb-4 font-mono text-xs text-accent">
                      {i === 0 ? "// ai handles this" : "// judgment handles this"}
                    </p>
                    <h3 className="mb-4 font-semibold">{group.label}</h3>
                    <div className="space-y-2.5">
                      {group.items.map((item, j) => (
                        <div key={j} className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                          <p className="text-sm leading-relaxed text-muted">{item}</p>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </RevealOnScroll>
              ))}
            </div>
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
                  title: "Scoping Sprint",
                  description:
                    "A 2-week scoping engagement ($3,500 fixed) that produces a written specification, technology choice rationale, milestone plan, and the fixed project fee. No scoping sprint, no project — this is non-negotiable.",
                },
                {
                  step: "02",
                  title: "Build",
                  description:
                    "6–10 weeks of AI-accelerated development against the locked specification. Weekly progress updates. Scope changes are priced separately — the spec is the contract.",
                },
                {
                  step: "03",
                  title: "Delivery + Support",
                  description:
                    "Production deployment, handover documentation, and a 30-day support window. After that, you can transition to a Fractional CTO Retainer or operate the product independently.",
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
              <p className="mb-6 font-mono text-sm text-accent">// pricing</p>
            </RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <RevealOnScroll delay={0.05}>
                <GlowCard className="h-full">
                  <p className="mb-1 font-mono text-xs text-muted">scoping sprint</p>
                  <p className="text-2xl font-bold">$3,500</p>
                  <p className="mt-1 text-sm text-muted">Fixed fee · 2 weeks · required first</p>
                  <p className="mt-3 text-xs text-muted">
                    Produces a written spec, tech stack decision, milestone plan, and the fixed
                    project fee. This deliverable is yours regardless of whether the build proceeds.
                  </p>
                </GlowCard>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <GlowCard featured className="h-full sm:col-span-1">
                  <p className="mb-1 font-mono text-xs text-accent">mvp build</p>
                  <p className="text-2xl font-bold">$25K–$45K</p>
                  <p className="mt-1 text-sm text-muted">Fixed fee · 6–10 weeks</p>
                  <div className="mt-4 space-y-3">
                    {PAYMENT_MILESTONES.map((m) => (
                      <div key={m.pct} className="flex gap-3">
                        <span className="font-mono text-sm font-bold text-accent w-10 flex-shrink-0">
                          {m.pct}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{m.label}</p>
                          <p className="text-xs text-muted">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <GlowCard className="h-full">
                  <p className="mb-1 font-mono text-xs text-muted">tech fit</p>
                  <p className="text-sm font-medium mb-3">Standard stacks in scope:</p>
                  <div className="flex flex-wrap gap-2">
                    {["React / Next.js", "Node.js", "Python", "Rust", "Go", "Kubernetes", "AI / LLM products"].map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    Hardware ventures and multi-year platform builds are not a fit for this service.
                  </p>
                </GlowCard>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to build the thing{" "}
                <GradientText>you can actually ship</GradientText>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                The scoping sprint is the entry point. Before that, a 30-minute fit
                conversation to confirm the concept, scope, and timeline are right for this service.
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

"use client";

import { MapPin, Briefcase, GraduationCap, Award, Globe } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Badge } from "@/components/ui/Badge";
import { AboutIllustration } from "@/components/ui/AboutIllustration";
import { ABOUT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="mb-2 font-mono text-sm text-accent">// about</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Background
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Narrative + Illustration */}
          <div className="space-y-6 lg:col-span-3">
            {ABOUT.narrative.map((paragraph, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <p className="text-muted leading-relaxed">{paragraph}</p>
              </RevealOnScroll>
            ))}
            <RevealOnScroll delay={0.4}>
              <AboutIllustration className="mx-auto mt-8 w-full max-w-sm opacity-70" />
            </RevealOnScroll>
          </div>

          {/* Quick Facts Card */}
          <RevealOnScroll className="lg:col-span-2" delay={0.2}>
            <div className="glow-card space-y-6 p-6">
              <h3 className="font-mono text-sm text-accent">// quick facts</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-muted" />
                  <span className="text-sm">{ABOUT.quickFacts.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted" />
                  <span className="text-sm">{ABOUT.quickFacts.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted" />
                  <span className="text-sm">{ABOUT.quickFacts.education}</span>
                </div>
              </div>

              {/* Programming Languages */}
              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Programming
                </h4>
                <div className="space-y-3">
                  {ABOUT.quickFacts.programmingLanguages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{lang.name}</span>
                        <span className="text-muted">{lang.proficiency}%</span>
                      </div>
                      <div className="proficiency-bar">
                        <div
                          className="proficiency-bar-fill"
                          style={{ width: `${lang.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spoken Languages */}
              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Languages
                </h4>
                <div className="space-y-2">
                  {ABOUT.quickFacts.spokenLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-muted" />
                        {lang.name}
                      </span>
                      <span className="text-xs text-muted">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ABOUT.quickFacts.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5"
                    >
                      <Award className="h-3 w-3 text-accent" />
                      <span className="text-xs font-medium text-accent">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

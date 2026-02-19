"use client";

import { Linkedin, Github } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SocialLink } from "@/components/ui/SocialLink";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="mb-2 font-mono text-sm text-accent">// contact</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            I&apos;m always interested in talking with founders building
            ambitious products, engineers solving hard problems, and anyone
            thinking about how AI agents will reshape how we work.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:max-w-lg">
          <RevealOnScroll delay={0.1}>
            <SocialLink
              href={SOCIAL_LINKS.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              description="Connect & message"
              large
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <SocialLink
              href={SOCIAL_LINKS.github}
              icon={Github}
              label="GitHub"
              description="See my code"
              large
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

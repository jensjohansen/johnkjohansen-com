"use client";

import { ExternalLink } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { ProjectsIllustration } from "@/components/ui/ProjectsIllustration";
import { PROJECTS } from "@/lib/constants";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="mb-2 font-mono text-sm text-accent">// projects</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What I&apos;m Building
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ProjectsIllustration className="mt-8 w-full opacity-60" />
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.1}>
              <GlowCard featured={project.featured} className="flex h-full flex-col">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <Badge variant={project.status === "Active" ? "accent" : "default"}>
                    {project.status}
                  </Badge>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}

                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-cyan"
                    >
                      {project.link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </GlowCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — John K. Johansen`,
    description: post.excerpt,
    authors: [{ name: post.author ?? "John K. Johansen" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://johnkjohansen.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author ?? "John K. Johansen"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? "John K. Johansen",
      url: "https://johnkjohansen.com",
    },
    publisher: {
      "@type": "Person",
      name: "John K. Johansen",
      url: "https://johnkjohansen.com",
    },
    keywords: post.tags.join(", "),
    url: `https://johnkjohansen.com/blog/${slug}`,
    mainEntityOfPage: `https://johnkjohansen.com/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-24">
        {/* Back nav */}
        <div className="mx-auto max-w-3xl px-6 py-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </a>
        </div>

        {/* Header */}
        <header className="relative overflow-hidden py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="orb orb-1 opacity-10" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6">
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="accent">{tag}</Badge>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <GradientText>{post.title}</GradientText>
            </h1>
            {post.subtitle && (
              <p className="mt-3 text-xl font-medium text-foreground/70">{post.subtitle}</p>
            )}
            {post.excerpt && (
              <p className="mt-4 text-lg text-muted leading-relaxed">{post.excerpt}</p>
            )}
            <div className="mt-6 flex items-center gap-4 text-sm text-muted border-t border-card-border pt-4">
              <span>{post.author ?? "John K. Johansen"}</span>
              {post.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="mx-auto max-w-3xl px-6 pb-24">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Footer CTA */}
        <div className="border-t border-card-border">
          <div className="mx-auto max-w-3xl px-6 py-12 text-center">
            <p className="font-mono text-sm text-accent mb-2">// want to go deeper?</p>
            <p className="text-muted mb-6">
              I write about AI agents, startup engineering strategy, and building systems that
              let small teams do big things — without handing your IP to cloud providers.
            </p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-6 py-3 font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              Read more articles
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

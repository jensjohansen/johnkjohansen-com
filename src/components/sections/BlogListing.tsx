"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { GradientText } from "@/components/ui/GradientText";
import type { PostMeta } from "@/lib/blog";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogListingProps {
  posts: PostMeta[];
}

export function BlogListing({ posts }: BlogListingProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <p className="mb-2 font-mono text-sm text-accent">// articles</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          AI Agents in the{" "}
          <GradientText>Real World</GradientText>
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Practical insights on integrating autonomous AI agents into startup technical
          strategy — without handing your IP to cloud providers. Written from 49 years of
          engineering perspective across every automation wave since the 1970s.
        </p>

        {/* Search */}
        <div className="mt-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-card/50 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
            aria-label="Search articles"
          />
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`inline-block rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === null
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-white/10 bg-white/5 text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`inline-block rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/5 text-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        {(query || activeTag) && (
          <p className="mt-4 text-sm text-muted">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
          </p>
        )}

        {/* No posts state */}
        {posts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-mono text-sm text-accent mb-2">// coming soon</p>
            <p className="text-muted">
              The first articles are being written. Check back shortly — or connect on{" "}
              <a
                href="https://www.linkedin.com/in/johnkjohansen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent underline underline-offset-4 transition-colors"
              >
                LinkedIn
              </a>{" "}
              to be notified when they publish.
            </p>
          </div>
        )}

        {/* No search results */}
        {posts.length > 0 && filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted">No articles match that search.</p>
            <button
              onClick={() => { setQuery(""); setActiveTag(null); }}
              className="mt-4 text-sm text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured posts */}
        {featured.length > 0 && (
          <div className="mt-12 space-y-6">
            {featured.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <GlowCard featured>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <Badge variant="accent">Featured</Badge>
                    {post.date && (
                      <time className="text-xs text-muted" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </GlowCard>
              </a>
            ))}
          </div>
        )}

        {/* Rest of posts */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rest.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <GlowCard className="h-full flex flex-col">
                  <div className="flex-1">
                    {post.date && (
                      <time className="text-xs text-muted block mb-2" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    )}
                    <h2 className="font-semibold group-hover:text-accent transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </GlowCard>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

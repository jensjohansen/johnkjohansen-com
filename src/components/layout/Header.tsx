"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-card-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="Johansen AI Solutions - Home"
        >
          <img
            src="/logo-icon.png"
            alt="Johansen AI Logo"
            className="h-8 w-8 object-contain brightness-110 grayscale-0 contrast-125"
          />
          <span className="font-sans text-lg font-bold tracking-tight bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
            Johansen AI Solutions
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden">
          <nav
            className="flex flex-col items-center justify-center gap-8 pt-20"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-foreground transition-colors hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

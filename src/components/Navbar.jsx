"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import data from "@/data/portfolio.json";
import ThemeToggle from "@/components/ThemeToggle";
import {
  BracesIcon,
  SocialIcon,
  MenuIcon,
  CloseIcon,
  DownloadIcon,
} from "@/components/icons";

const { id: profileSocialGitHubUrl } =
  data.socials.find((s) => s.icon === "github") || {};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = data.nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    if (els.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/#home" className="flex items-center gap-2.5 group" aria-label="Back to top">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-lg">
            <BracesIcon size={18} strokeWidth={2.2} />
          </span>
          <span className="hidden sm:block font-semibold tracking-tight">
            {data.profile.name}
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {data.nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                active === item.id
                  ? "text-foreground bg-surface"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={data.profile.resume}
            download="Mehadee-Hassan-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-[1.03]"
          >
            <DownloadIcon size={16} />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-foreground transition-colors"
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass border-b" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {data.nav.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-surface text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
              <div className="flex items-center gap-2">
                {data.socials
                  .filter((s) => s.url && !s.url.startsWith("_hint"))
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-accent hover:border-accent transition-colors"
                    >
                      <SocialIcon icon={s.icon} size={17} />
                    </a>
                  ))}
              </div>
              <a
                href={data.profile.resume}
                download="Mehadee-Hassan-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <DownloadIcon size={16} />
                Resume
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

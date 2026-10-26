"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
} from "@/components/icons";

const PAGE_SIZE = 9;

function isRealUrl(url) {
  return Boolean(url) && !String(url).startsWith("_hint");
}

export default function Projects() {
  const projects = data.projects;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const start = (page - 1) * PAGE_SIZE;
  const visibleProjects = projects.slice(start, start + PAGE_SIZE);

  function goToPage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Things I{"'"}ve <span className="text-gradient">shipped</span>
            </>
          }
          description="Each project is deployed and live — open one to see the tech stack, the journey, and what comes next."
        />

        <div ref={topRef} className="scroll-mt-24" />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 110}>
              <article className="card card-hover flex h-full flex-col overflow-hidden">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden"
                  aria-label={`View details of ${project.name}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 ? (
                      <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                        +{project.tags.length - 3}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">{project.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
                    >
                      View Details
                      <ArrowRightIcon size={14} />
                    </Link>
                    {isRealUrl(project.liveUrl) ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live site`}
                        title="Open live site"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
                      >
                        <ExternalLinkIcon size={15} />
                        Live
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 ? (
          <nav
            aria-label="Projects pagination"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors enabled:hover:text-accent enabled:hover:border-accent disabled:opacity-40"
            >
              <ChevronDownIcon size={16} className="rotate-90" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => goToPage(n)}
                aria-current={n === page ? "page" : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  n === page
                    ? "bg-gradient-brand text-white shadow-md"
                    : "border border-line text-muted enabled:hover:border-accent enabled:hover:text-accent"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors enabled:hover:text-accent enabled:hover:border-accent disabled:opacity-40"
            >
              <ChevronDownIcon size={16} className="-rotate-90" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

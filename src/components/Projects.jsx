import Image from "next/image";
import Link from "next/link";
import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

function isRealUrl(url) {
  return Boolean(url) && !String(url).startsWith("_hint");
}

export default function Projects() {
  const { projects } = data;

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

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
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
      </div>
    </section>
  );
}

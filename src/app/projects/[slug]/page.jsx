import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubIcon,
  CheckIcon,
  CodeIcon,
} from "@/components/icons";

function isRealUrl(url) {
  return Boolean(url) && !String(url).startsWith("_hint");
}

export function generateStaticParams() {
  return data.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      images: [{ url: project.image, width: 1440, height: 900 }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = data.projects.indexOf(project);
  const prev = data.projects[index - 1];
  const next = data.projects[index + 1];

  return (
    <main className="relative flex-1">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden" aria-hidden="true">
        <div className="aurora aurora-a h-[400px] w-[400px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 dot-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <article className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        {/* Back link */}
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeftIcon size={16} />
            All projects
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={80}>
          <header className="mt-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{project.name}</h1>
            <p className="mt-2 text-lg font-medium text-gradient sm:text-xl">{project.tagline}</p>
          </header>
        </Reveal>

        {/* Cover image */}
        <Reveal delay={160}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-line shadow-2xl">
            <Image
              src={project.image}
              alt={`${project.name} — full preview`}
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Action buttons */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {isRealUrl(project.liveUrl) ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLinkIcon size={17} />
                View Live Project
              </a>
            ) : null}
            {isRealUrl(project.githubUrl) ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost fill-current"
              >
                <GitHubIcon size={17} />
                GitHub Repository
              </a>
            ) : null}
          </div>
        </Reveal>

        {/* Content grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_0.9fr] lg:gap-12">
          <div className="flex flex-col gap-10">
            {/* Description */}
            <Reveal>
              <section aria-labelledby="about-heading">
                <h2 id="about-heading" className="text-xl font-bold tracking-tight">
                  About the project
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {project.description.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Challenges */}
            <Reveal>
              <section aria-labelledby="challenges-heading">
                <h2 id="challenges-heading" className="text-xl font-bold tracking-tight">
                  Challenges faced
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="card flex gap-3.5 p-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{challenge}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Improvements */}
            <Reveal>
              <section aria-labelledby="future-heading">
                <h2 id="future-heading" className="text-xl font-bold tracking-tight">
                  Improvements & future plans
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.improvements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full glass text-accent">
                        <CheckIcon size={13} />
                      </span>
                      <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal delay={120} className="h-fit lg:sticky lg:top-24">
            <aside className="card p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                <CodeIcon size={16} className="text-accent" />
                Technology stack
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {project.tech.map((t) => (
                  <li key={t.name} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{t.use}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>

        {/* Prev / Next */}
        <Reveal>
          <nav
            aria-label="Other projects"
            className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="card card-hover group flex flex-col gap-1 p-5"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <ArrowLeftIcon size={13} />
                  Previous project
                </span>
                <span className="font-semibold transition-colors group-hover:text-accent">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="card card-hover group flex flex-col items-end gap-1 p-5 text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  Next project
                  <ArrowRightIcon size={13} />
                </span>
                <span className="font-semibold transition-colors group-hover:text-accent">
                  {next.name}
                </span>
              </Link>
            ) : null}
          </nav>
        </Reveal>
      </article>
    </main>
  );
}

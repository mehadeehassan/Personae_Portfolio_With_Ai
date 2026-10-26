import Image from "next/image";
import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import {
  DownloadIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  SocialIcon,
} from "@/components/icons";

export default function Hero() {
  const { profile, socials } = data;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="aurora aurora-a h-[420px] w-[420px] -top-24 -left-24" />
        <div className="aurora aurora-b h-[460px] w-[460px] top-1/3 -right-32" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-24 lg:px-8">
        {/* Left: intro */}
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-dot" />
              {profile.availability}
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              {profile.firstName} <span className="text-gradient">{profile.lastName}</span>
            </h1>

            <p className="text-lg font-medium text-muted sm:text-xl">
              <span className="font-semibold text-gradient">{profile.roles[0]}</span>
              <span className="mx-2 text-line">·</span>
              {profile.roles[1]}
            </p>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.summary}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3.5">
              <a
                href={profile.resume}
                download="Mehadee-Hassan-Resume.pdf"
                className="btn-primary"
              >
                <DownloadIcon size={18} />
                Download Resume
              </a>
              <a href="#projects" className="btn-ghost">
                View Projects
                <ArrowRightIcon size={16} />
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Find me on
              </span>
              <div className="flex items-center gap-2.5">
                {socials
                  .filter((s) => s.url && !s.url.startsWith("_hint"))
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:text-accent hover:border-accent"
                    >
                      <SocialIcon icon={s.icon} size={18} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: portrait */}
        <Reveal delay={150} className="relative">
          <div className="relative mx-auto max-w-[300px] sm:max-w-[360px] lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[3rem] bg-gradient-brand opacity-25 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-2xl">
              <Image
                src={profile.photo}
                alt={`Professional portrait of ${profile.name}`}
                width={1024}
                height={1024}
                priority
                sizes="(min-width: 1024px) 360px, 72vw"
                className="h-auto w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10"
              />
            </div>

            {/* Floating tech chips */}
            <span className="glass absolute -left-6 top-10 rounded-full px-3.5 py-1.5 text-xs font-semibold animate-float">
              ⚛️ React.js
            </span>
            <span
              className="glass absolute -right-4 bottom-16 rounded-full px-3.5 py-1.5 text-xs font-semibold animate-float"
              style={{ animationDelay: "1.4s" }}
            >
              ▲ Next.js
            </span>
            <span
              className="glass absolute -bottom-4 left-10 rounded-full px-3.5 py-1.5 text-xs font-semibold animate-float"
              style={{ animationDelay: "2.6s" }}
            >
              🟩 Node.js
            </span>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="hidden justify-center pb-8 lg:flex">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="text-muted hover:text-accent transition-colors"
        >
          <ChevronDownIcon size={22} className="animate-bounce-soft" />
        </a>
      </div>
    </section>
  );
}

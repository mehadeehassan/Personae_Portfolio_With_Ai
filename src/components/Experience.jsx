import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { BriefcaseIcon } from "@/components/icons";

export default function Experience() {
  const { experience } = data;

  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora aurora-a h-[340px] w-[340px] top-0 -right-40" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Where I{"'"}ve been <span className="text-gradient">building</span>
            </>
          }
        />

        <div className="relative mx-auto flex max-w-3xl flex-col gap-6">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[22px] top-4 w-px bg-gradient-to-b from-accent via-accent-2/40 to-transparent"
          />
          {experience.map((item, i) => (
            <Reveal key={item.role} delay={i * 120}>
              <div className="relative flex gap-5">
                <span className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass text-accent">
                  <BriefcaseIcon size={19} />
                </span>
                <div className="card card-hover flex-1 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-base font-semibold sm:text-lg">{item.role}</h3>
                      {item.site ? (
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-block text-sm font-medium text-accent hover:underline"
                        >
                          {item.org}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-accent">{item.org}</p>
                      )}
                    </div>
                    {item.period ? (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
                        {item.period}
                      </span>
                    ) : null}
                  </div>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {item.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { GraduationCapIcon, AwardIcon } from "@/components/icons";

export default function Education() {
  const { education, certifications } = data;

  return (
    <section id="education" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Academic <span className="text-gradient">background</span>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Timeline of degrees */}
          <div className="relative flex flex-col gap-6">
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[22px] top-4 w-px bg-gradient-to-b from-accent via-accent-2/40 to-transparent"
            />
            {education.map((item, i) => (
              <Reveal key={item.degree} delay={i * 120}>
                <div className="relative flex gap-5">
                  <span className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass text-accent">
                    <GraduationCapIcon size={20} />
                  </span>
                  <div className="card card-hover flex-1 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="text-base font-semibold sm:text-lg">{item.degree}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          item.status === "Ongoing"
                            ? "bg-gradient-brand text-white"
                            : "bg-surface text-muted"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-muted">{item.institution}</p>
                    {item.period ? (
                      <p className="mt-3 inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
                        {item.period}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications */}
          <Reveal delay={220}>
            <div className="card card-hover h-fit p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <AwardIcon size={18} />
                </span>
                Certifications
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="rounded-xl bg-surface p-4">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-accent">{cert.issuer}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{cert.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

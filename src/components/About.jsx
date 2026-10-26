import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";

export default function About() {
  const { about } = data;

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={
            <>
              A developer who <span className="text-gradient">ships end to end</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div className="flex flex-col gap-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <aside className="card card-hover h-fit p-6 sm:p-7 lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick facts
              </h3>
              <ul className="mt-4 flex flex-col gap-3.5">
                {about.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                      <CheckIcon size={12} />
                    </span>
                    <span className="text-sm font-medium text-muted">{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm leading-relaxed text-muted">
                  Currently studying CSE at Northern University Bangladesh while building and
                  shipping projects in public.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

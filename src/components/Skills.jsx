import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CodeIcon, TechIcon } from "@/components/icons";

export default function Skills() {
  const { skillGroups, skillChips } = data;

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora aurora-b h-[380px] w-[380px] top-10 -left-40" />
        <div className="aurora aurora-a h-[380px] w-[380px] -bottom-20 -right-36" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The tools I <span className="text-gradient">build with</span>
            </>
          }
          description="The stack I reach for every day — grouped by the layer of the web it lives in."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 100}>
              <div className="card card-hover h-full p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-base font-semibold">
                  <span className="h-2 w-2 rounded-full bg-gradient-brand" />
                  {group.category}
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/tile flex flex-col items-center gap-2.5 rounded-xl border border-line bg-surface/60 px-2.5 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
                    >
                      <span className="flex h-10 w-10 items-center justify-center text-muted transition-colors duration-300 group-hover/tile:text-accent">
                        <TechIcon name={skill.name} size={26} />
                      </span>
                      <span className="text-xs font-medium leading-tight text-muted transition-colors duration-300 group-hover/tile:text-foreground">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <CodeIcon size={13} />
              Also working with
            </span>
            {skillChips.map((chip, i) => (
              <span
                key={i}
                className="rounded-full border border-line px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

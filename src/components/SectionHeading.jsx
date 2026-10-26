import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, description, center = true }) {
  return (
    <Reveal
      className={`mb-12 sm:mb-16 ${center ? "flex flex-col items-center text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-balance">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

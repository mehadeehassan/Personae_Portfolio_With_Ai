import Link from "next/link";
import data from "@/data/portfolio.json";
import { SocialIcon } from "@/components/icons";

export default function Footer() {
  const { profile, socials, nav, footer } = data;
  const year = footer.year;
  const visibleSocials = socials.filter((s) => s.url && !s.url.startsWith("_hint"));

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/#home" className="flex items-center gap-2.5" aria-label="Back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white font-bold text-sm">
              MH
            </span>
            <span className="font-semibold tracking-tight">
              {profile.name}
              <span className="text-accent">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{footer.note}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {nav.slice(1).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Connect</h3>
          <div className="mt-4 flex items-center gap-2.5">
            {visibleSocials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:text-accent hover:border-accent"
              >
                <SocialIcon icon={s.icon} size={16} />
              </a>
            ))}
          </div>
          <a
            href={`mailto:${data.contact.email}`}
            className="mt-4 inline-block text-sm text-muted transition-colors hover:text-accent"
          >
            {data.contact.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

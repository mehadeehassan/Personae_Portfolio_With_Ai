import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="max-w-md text-muted">
        The page you are looking for took a wrong turn — nothing to worry about.
      </p>
      <Link href="/#home" className="btn-primary mt-2">
        Back to portfolio
      </Link>
    </main>
  );
}

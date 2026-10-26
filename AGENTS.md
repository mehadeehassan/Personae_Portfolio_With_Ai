<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio — agent notes

Single-app Next.js 16.4 App Router project (Turbopack, JavaScript) in `src/app`. Use npm; `package-lock.json` is the lockfile.

## Commands

- `npm run dev` — dev server. If Next reports an existing server via `.next/dev/lock`, reuse it instead of killing it.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`). This repo does **not** use `next lint`.
- `npx eslint src/app/page.js` — lint a single file.
- `npm run build` — production build; the only real check for prerender/cache behavior.
- `npm start` — serve a completed build.
- No test runner or standalone typecheck script exists. Don't assume `npm test` or `npm run typecheck`; verify with lint + build.

## Non-default configuration (keep it)

- `next.config.mjs` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Leave all three on.
- With Cache Components, the `dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, and `runtime` route-segment exports are removed. Request-time data (uncached fetches, `cookies()`, `headers()`, `params`, `searchParams`) must be under `<Suspense>` or cached with `"use cache"`; otherwise `next build` reports a blocking-prerender error.
- `params`, `searchParams`, `cookies()`, and `headers()` are async — always `await` them.
- React Compiler is enabled, so manual `useMemo`/`useCallback` are usually unnecessary; keep render logic pure.
- Tailwind v4 runs through the `@tailwindcss/turbopack` loader in `next.config.mjs`. There is intentionally no `postcss.config.*` or `tailwind.config.*`; add theme tokens with `@theme` in `src/app/globals.css`.
- App code is JavaScript with the `@/*` → `src/*` alias from `jsconfig.json`. Don't add TypeScript config unless asked.
- Request interception uses `src/proxy.js` exporting `proxy`; `middleware.js` is deprecated in Next 16.

## Layout and template state

- `src/app/layout.js` owns `<html>`, `<body>`, and the Geist font variables. `<body>` is a flex column, so full-height page wrappers use `flex-1`.
- Root metadata still says "Create Next App"; update it when building the actual portfolio.

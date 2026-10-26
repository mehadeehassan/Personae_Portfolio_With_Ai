"use client";

import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Pure CSS-driven toggle: the icon is selected by the current `data-theme`
 * attribute via the `dark:` variant, so there is no state to hydrate and no flash.
 */
export default function ThemeToggle() {
  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", current);
    try {
      localStorage.setItem("mh-theme", current);
    } catch {
      /* localStorage unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {/* Show moon in light mode (click → dark), sun in dark mode (click → light) */}
      <SunIcon size={18} className="hidden dark:block" />
      <MoonIcon size={18} className="block dark:hidden" />
    </button>
  );
}

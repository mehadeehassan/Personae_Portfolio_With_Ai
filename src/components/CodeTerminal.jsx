"use client";

import { useEffect, useState } from "react";
import { BracesIcon } from "@/components/icons";

const CODE = [
  [
    { t: "const ", c: "tok-kw" },
    { t: "mehadee", c: "tok-var" },
    { t: " = {", c: "tok-p" },
  ],
  [
    { t: "  name", c: "tok-key" },
    { t: ": ", c: "tok-p" },
    { t: '"Mehadee Hassan"', c: "tok-str" },
    { t: ",", c: "tok-p" },
  ],
  [
    { t: "  role", c: "tok-key" },
    { t: ": ", c: "tok-p" },
    { t: '"Full Stack (MERN)"', c: "tok-str" },
    { t: ",", c: "tok-p" },
  ],
  [
    { t: "  stack", c: "tok-key" },
    { t: ": [", c: "tok-p" },
    { t: '"React"', c: "tok-str" },
    { t: ", ", c: "tok-p" },
    { t: '"Next.js"', c: "tok-str" },
    { t: ", ", c: "tok-p" },
    { t: '"Node"', c: "tok-str" },
    { t: "],", c: "tok-p" },
  ],
  [
    { t: "  db", c: "tok-key" },
    { t: ": [", c: "tok-p" },
    { t: '"MySQL"', c: "tok-str" },
    { t: ", ", c: "tok-p" },
    { t: '"MongoDB"', c: "tok-str" },
    { t: "],", c: "tok-p" },
  ],
  [
    { t: "  passion", c: "tok-key" },
    { t: ": ", c: "tok-p" },
    { t: '"clean, responsive UI"', c: "tok-str" },
    { t: ",", c: "tok-p" },
  ],
  [
    { t: "  openToWork", c: "tok-key" },
    { t: ": ", c: "tok-p" },
    { t: "true", c: "tok-bool" },
    { t: ",", c: "tok-p" },
  ],
  [{ t: "};", c: "tok-p" }],
  [
    { t: "while", c: "tok-kw" },
    { t: " (", c: "tok-p" },
    { t: "!shipped", c: "tok-var" },
    { t: ") {", c: "tok-p" },
  ],
  [
    { t: "  mehadee", c: "tok-var" },
    { t: ".", c: "tok-p" },
    { t: "build", c: "tok-fn" },
    { t: "();", c: "tok-p" },
  ],
  [{ t: "}", c: "tok-p" }],
  [{ t: "// deploying ideas, one commit at a time", c: "tok-comment" }],
];

// Flat char stream with token classes (built once at module load).
const STREAM = [];
for (const line of CODE) {
  for (const token of line) {
    for (const ch of token.t) STREAM.push({ ch, cls: token.c });
  }
  STREAM.push({ ch: "\n", cls: "tok-p" });
}

function renderCode(stream, typed) {
  const nodes = [];
  let i = 0;
  let key = 0;
  while (i < stream.length && i < typed) {
    if (stream[i].ch === "\n") {
      nodes.push(<br key={key++} />);
      i += 1;
      continue;
    }
    const cls = stream[i].cls;
    let buf = "";
    while (
      i < stream.length &&
      i < typed &&
      stream[i].ch !== "\n" &&
      stream[i].cls === cls
    ) {
      buf += stream[i].ch;
      i += 1;
    }
    nodes.push(
      <span key={key++} className={cls}>
        {buf}
      </span>
    );
  }
  return nodes;
}

/**
 * macOS-style code window with a continuous typing simulation.
 * Respects prefers-reduced-motion by showing the full code instantly.
 */
export default function CodeTerminal() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let timer;
    let cancelled = false;
    let current = 0;
    let phase = "typing";

    function tick() {
      if (cancelled) return;
      if (phase === "typing") {
        current += 1;
        setTyped(current);
        if (current >= STREAM.length) {
          phase = "holding";
          timer = setTimeout(tick, 4500);
        } else {
          timer = setTimeout(tick, STREAM[current - 1]?.ch === "\n" ? 130 : 26);
        }
      } else {
        phase = "typing";
        current = 0;
        setTyped(0);
        timer = setTimeout(tick, 600);
      }
    }

    if (reduce) {
      // Show the full code instantly for reduced motion (deferred to avoid sync setState)
      timer = setTimeout(() => {
        if (!cancelled) setTyped(STREAM.length);
      }, 0);
    } else {
      timer = setTimeout(tick, 500);
    }
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="card overflow-hidden shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-card px-2.5 py-1 font-mono text-[11px] text-muted">
          <BracesIcon size={12} className="text-accent" />
          mehadee.config.js
        </span>
      </div>

      {/* Code area */}
      <pre
        aria-label="A playful config file describing Mehadee Hassan, typed out like a developer's editor"
        className="min-h-[19em] overflow-x-auto whitespace-pre px-5 py-4 font-mono text-[12.5px] leading-[1.6] sm:min-h-[21em] sm:px-6 sm:text-[13.5px]"
      >
        <code>
          {renderCode(STREAM, typed)}
          <span className="type-cursor" aria-hidden="true" />
        </code>
      </pre>
    </div>
  );
}

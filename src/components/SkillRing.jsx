"use client";

import { useEffect, useId, useRef, useState } from "react";

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Animated circular skill progress ring.
 * Fills from 0 → level% the first time it scrolls into view.
 */
export default function SkillRing({ name, level }) {
  const gradientId = useId();
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        className="w-[92px] h-[92px] sm:w-[104px] sm:h-[104px]"
        role="img"
        aria-label={`${name}: ${level}%`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth="7" />
        <g transform="rotate(-90 50 50)">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            className={`ring-fg ${visible ? "ring-on" : ""}`}
            style={{ "--c": CIRCUMFERENCE, "--to": CIRCUMFERENCE * (1 - level / 100) }}
          />
        </g>
        <text
          x="50"
          y="57"
          textAnchor="middle"
          className="fill-current font-semibold"
          style={{ fontSize: "19px" }}
        >
          {level}%
        </text>
      </svg>
      <span className="text-xs sm:text-sm font-medium text-muted text-center leading-tight">{name}</span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({
  value,
  durationMs = 900,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const [display, setDisplay] = useState<number>(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    startRef.current = null;
    let raf = 0;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;
      setDisplay(next);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-US");

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

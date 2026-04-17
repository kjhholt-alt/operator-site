// WatchdogPanel — tactical status panel. Data comes from the live snapshot.
// Falls back to a representative list when no snapshot is available yet.

import type { WatchdogSection } from "@/lib/snapshot";

type Props = {
  sections: WatchdogSection[];
  live: boolean;
};

export function WatchdogPanel({ sections, live }: Props) {
  const okCount = sections.filter((s) => s.ok).length;
  const staleCount = sections.length - okCount;
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <div className="eyebrow mb-1">WATCHDOG / STATUS SECTIONS</div>
          <h3 className="text-lg font-semibold">
            {sections.length} TRACKED
            <span className="mono text-sm text-[color:var(--muted)] ml-3">
              {okCount} OK · {staleCount} STALE
            </span>
          </h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span
            className={`pip ${live ? "pip-ok scan-pulse" : "pip-idle"}`}
          />
          {live ? "LIVE" : "SNAPSHOT"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mono text-xs">
        {sections.map((s) => {
          const pipClass = s.ok ? "pip-ok" : "pip-alert";
          const ageClass = s.ok
            ? "text-[color:var(--muted)]"
            : "text-[color:var(--alert)]";
          return (
            <div
              key={s.name}
              className="flex items-center justify-between border-b border-[color:var(--border)]/40 py-2"
            >
              <div className="flex items-center gap-3">
                <span className={`pip ${pipClass}`} />
                <span className="text-[color:var(--foreground)]">
                  {s.name}
                </span>
              </div>
              <div className={`flex items-center gap-3 ${ageClass}`}>
                <span>age={s.age}</span>
                <span className="text-[color:var(--muted)] opacity-60">
                  max={s.max_hours}h
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

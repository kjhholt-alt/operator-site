// WatchdogPanel — tactical status panel showing the 10 sections tracked.
// Mirrors what `operator doctor` and the real watchdog daemon produce.

type Section = {
  name: string;
  ok: boolean;
  age: string;
  max: string;
};

const SECTIONS: Section[] = [
  { name: "briefing", ok: true, age: "6h 12m", max: "26h" },
  { name: "services", ok: true, age: "42m", max: "2h" },
  { name: "prs", ok: true, age: "58m", max: "2h" },
  { name: "marketing", ok: true, age: "4h 30m", max: "26h" },
  { name: "outreach", ok: true, age: "8h 01m", max: "26h" },
  { name: "cost", ok: true, age: "3d 2h", max: "7d" },
  { name: "advisor", ok: true, age: "1d 14h", max: "2d 2h" },
  { name: "client_health", ok: true, age: "2d 4h", max: "7d" },
  { name: "dependencies", ok: true, age: "4d 6h", max: "7d" },
  { name: "ci", ok: false, age: "6h", max: "4h" },
];

export function WatchdogPanel() {
  const okCount = SECTIONS.filter((s) => s.ok).length;
  const staleCount = SECTIONS.length - okCount;
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <div className="eyebrow mb-1">WATCHDOG / STATUS SECTIONS</div>
          <h3 className="text-lg font-semibold">
            {SECTIONS.length} TRACKED
            <span className="mono text-sm text-[color:var(--muted)] ml-3">
              {okCount} OK · {staleCount} STALE
            </span>
          </h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span className="pip pip-ok scan-pulse" />
          TICK 30s
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mono text-xs">
        {SECTIONS.map((s) => {
          const pipClass = s.ok ? "pip-ok" : "pip-alert";
          const ageClass = s.ok ? "text-[color:var(--muted)]" : "text-[color:var(--alert)]";
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
                <span className="text-[color:var(--muted)] opacity-60">max={s.max}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

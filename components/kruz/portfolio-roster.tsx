type Project = {
  slug: string;
  tier: "low" | "medium" | "high";
  auto_merge: boolean;
};

const ROSTER: Project[] = [
  { slug: "operator-core", tier: "medium", auto_merge: false },
  { slug: "prospector-pro", tier: "medium", auto_merge: true },
  { slug: "ai-ops-consulting", tier: "medium", auto_merge: true },
  { slug: "pool-prospector", tier: "medium", auto_merge: true },
  { slug: "outdoor-crm", tier: "medium", auto_merge: true },
  { slug: "outreach-engine", tier: "medium", auto_merge: true },
  { slug: "pc-bottleneck", tier: "low", auto_merge: true },
  { slug: "dealbrain", tier: "medium", auto_merge: false },
  { slug: "game-forge", tier: "low", auto_merge: true },
  { slug: "pl-engine", tier: "high", auto_merge: false },
  { slug: "municipal-crm", tier: "high", auto_merge: false },
  { slug: "close-copilot", tier: "medium", auto_merge: true },
  { slug: "ag-market-pulse", tier: "low", auto_merge: true },
  { slug: "website-factory", tier: "low", auto_merge: true },
  { slug: "operator-site", tier: "low", auto_merge: true },
];

export function PortfolioRoster() {
  return (
    <div className="panel p-6 h-full">
      <div className="flex items-start justify-between mb-5 gap-2">
        <div>
          <div className="eyebrow mb-1">PORTFOLIO</div>
          <h3 className="text-lg font-semibold">{ROSTER.length} WATCHED</h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)]">
          config.toml
        </div>
      </div>

      <div className="mono text-xs space-y-1">
        <div className="grid grid-cols-[1fr_60px_40px] gap-2 text-[10px] tracking-wider text-[color:var(--muted)] pb-2 border-b border-[color:var(--border)]">
          <span>SLUG</span>
          <span className="text-right">TIER</span>
          <span className="text-right">AM</span>
        </div>
        {ROSTER.map((p) => {
          const tierColor =
            p.tier === "high"
              ? "text-[color:var(--alert)]"
              : p.tier === "medium"
                ? "text-[color:var(--warn)]"
                : "text-[color:var(--ok)]";
          return (
            <div
              key={p.slug}
              className="grid grid-cols-[1fr_60px_40px] gap-2 py-1.5 items-center border-b border-[color:var(--border)]/30"
            >
              <span className="truncate">{p.slug}</span>
              <span className={`text-right ${tierColor} uppercase`}>
                {p.tier}
              </span>
              <span className={`text-right ${p.auto_merge ? "text-[color:var(--ok)]" : "text-[color:var(--muted)]"}`}>
                {p.auto_merge ? "Y" : "N"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

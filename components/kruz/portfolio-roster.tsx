import type { SnapshotPortfolioEntry } from "@/lib/snapshot";

type Props = {
  roster: SnapshotPortfolioEntry[];
};

export function PortfolioRoster({ roster }: Props) {
  return (
    <div className="panel p-6 h-full">
      <div className="flex items-start justify-between mb-5 gap-2">
        <div>
          <div className="eyebrow mb-1">PORTFOLIO</div>
          <h3 className="text-lg font-semibold">{roster.length} WATCHED</h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)]">
          config.toml
        </div>
      </div>

      {roster.length === 0 ? (
        <div className="mono text-xs text-[color:var(--muted)] py-8 text-center">
          No projects configured.
        </div>
      ) : (
        <div className="mono text-xs space-y-1">
          <div className="grid grid-cols-[1fr_60px_40px] gap-2 text-[10px] tracking-wider text-[color:var(--muted)] pb-2 border-b border-[color:var(--border)]">
            <span>SLUG</span>
            <span className="text-right">TIER</span>
            <span className="text-right">AM</span>
          </div>
          {roster.map((p) => {
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
                <span
                  className={`text-right ${p.auto_merge ? "text-[color:var(--ok)]" : "text-[color:var(--muted)]"}`}
                >
                  {p.auto_merge ? "Y" : "N"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

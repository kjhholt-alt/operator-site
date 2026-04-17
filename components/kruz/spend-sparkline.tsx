import type { SnapshotCostPoint } from "@/lib/snapshot";

/**
 * Tactical-styled 7-day bar chart. No external chart lib — pure SVG.
 *
 * Shows cost (USD) per day; total on the right. If the series is empty or
 * all-zero, shows a calm "no spend" state with the same layout so the
 * panel doesn't jump when data comes in.
 */
export function SpendSparkline({
  series,
  cost7dUsd,
  cost24hUsd,
}: {
  series?: SnapshotCostPoint[];
  cost7dUsd?: number;
  cost24hUsd?: number;
}) {
  const rows = series ?? [];
  const maxUsd = Math.max(0.01, ...rows.map((d) => d.usd));
  const total7d =
    cost7dUsd ?? rows.reduce((s, d) => s + d.usd, 0);
  const total24h = cost24hUsd ?? (rows.length ? rows[rows.length - 1].usd : 0);

  const WIDTH = 280;
  const HEIGHT = 60;
  const COLS = Math.max(7, rows.length);
  const BAR_W = WIDTH / COLS - 2;

  return (
    <div className="panel bracket-corners p-5">
      <header className="flex items-center justify-between mb-1">
        <div className="eyebrow flex items-center gap-2">
          <span className="pip pip-ok" />
          CLAUDE SPEND / 7d
        </div>
        <div className="mono text-[10px] text-[color:var(--muted)]">
          ${total7d.toFixed(2)} TOTAL
        </div>
      </header>
      <p className="mono text-[11px] text-[color:var(--muted)] italic mb-3">
        Claude bill for the last week — what the daemon costs to run.
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-16 block"
        preserveAspectRatio="none"
      >
        {rows.map((d, i) => {
          const h = maxUsd > 0 ? (d.usd / maxUsd) * (HEIGHT - 8) : 1;
          const x = i * (WIDTH / COLS) + 1;
          const y = HEIGHT - h;
          return (
            <rect
              key={d.day}
              x={x}
              y={y}
              width={BAR_W}
              height={Math.max(1, h)}
              className="fill-[color:var(--accent)]"
              opacity={0.8}
            >
              <title>{`${d.day}: $${d.usd.toFixed(4)} / ${d.jobs} jobs`}</title>
            </rect>
          );
        })}
        {/* ground line */}
        <line
          x1={0}
          x2={WIDTH}
          y1={HEIGHT - 0.5}
          y2={HEIGHT - 0.5}
          className="stroke-[color:var(--border)]"
          strokeWidth={0.5}
        />
      </svg>

      <div className="mt-2 flex items-center justify-between mono text-[10px] text-[color:var(--muted)]">
        <span>
          {rows.length ? rows[0].day : "—"} → {rows.length ? rows[rows.length - 1].day : "—"}
        </span>
        <span>LAST 24h: ${total24h.toFixed(2)}</span>
      </div>
    </div>
  );
}

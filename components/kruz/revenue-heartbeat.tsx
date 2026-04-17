import type { SnapshotRevenueEntry } from "@/lib/snapshot";

type Props = {
  rows: SnapshotRevenueEntry[];
};

export function RevenueHeartbeat({ rows }: Props) {
  const anyPaying = rows.some((r) => r.paying_7d > 0 || r.mrr_usd > 0);
  const displayRows =
    rows.length > 0
      ? rows
      : [
          {
            slug: "no data",
            signups_7d: 0,
            active_users_7d: 0,
            paying_7d: 0,
            mrr_usd: 0,
          },
        ];

  return (
    <section className="panel bracket-corners p-6 md:p-8 mb-6">
      <div className="eyebrow mb-2 flex items-center gap-2">
        <span
          className={`pip ${anyPaying ? "pip-ok" : "pip-warn"}`}
        />
        REVENUE HEARTBEAT / PORTFOLIO
      </div>
      <p className="mono text-[11px] text-[color:var(--muted)] italic mb-5 leading-snug">
        What the portfolio earns — pre-revenue products shown at $0.
      </p>

      <ul className="divide-y divide-[color:var(--border)]">
        {displayRows.map((r) => (
          <li
            key={r.slug}
            className="py-3 first:pt-0 last:pb-0 grid grid-cols-2 md:grid-cols-4 gap-3 items-center"
          >
            <span className="mono text-sm col-span-2 md:col-span-1 truncate">
              {r.slug}
            </span>
            <Metric label="SIGNUPS / 7d" value={r.signups_7d.toString()} />
            <Metric label="PAYING" value={r.paying_7d.toString()} />
            <Metric
              label="MRR"
              value={r.mrr_usd > 0 ? `$${r.mrr_usd.toFixed(0)}` : "$0"}
              highlight={r.mrr_usd > 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="mono text-[9px] tracking-widest text-[color:var(--muted)]">
        {label}
      </div>
      <div
        className={`mono tabular-nums text-lg ${
          highlight
            ? "text-[color:var(--accent-bright)]"
            : "text-[color:var(--muted)]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

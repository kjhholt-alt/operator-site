import type { SnapshotJob } from "@/lib/snapshot";

type Props = {
  jobs: SnapshotJob[];
  cost24h: number;
  live: boolean;
};

export function JobFeed({ jobs, cost24h, live }: Props) {
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <div className="eyebrow mb-1">JOB LEDGER / LAST {jobs.length}</div>
          <h3 className="text-lg font-semibold">
            RECENT AGENT RUNS
            <span className="mono text-sm text-[color:var(--muted)] ml-3">
              24h cost ${cost24h.toFixed(2)}
            </span>
          </h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span
            className={`pip ${live ? "pip-ok scan-pulse" : "pip-idle"}`}
          />
          SQLITE LEDGER
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="mono text-xs text-[color:var(--muted)] py-8 text-center">
          No recent jobs.
        </div>
      ) : (
        <div className="mono text-xs space-y-1">
          <div className="grid grid-cols-[100px_1fr_140px_90px_70px] gap-3 text-[10px] tracking-wider text-[color:var(--muted)] pb-2 border-b border-[color:var(--border)]">
            <span>JOB_ID</span>
            <span>ACTION</span>
            <span>PROJECT</span>
            <span className="text-right">WHEN</span>
            <span className="text-right">COST</span>
          </div>
          {jobs.map((j) => {
            const statusClass =
              j.status === "complete" || j.status === "ok"
                ? "pip-ok"
                : j.status === "running" || j.status === "pending"
                  ? "pip-warn"
                  : "pip-alert";
            const actionColor =
              j.status === "failed" || j.status === "error"
                ? "text-[color:var(--alert)]"
                : "text-[color:var(--foreground)]";
            return (
              <div
                key={j.id}
                className="grid grid-cols-[100px_1fr_140px_90px_70px] gap-3 py-2 items-center border-b border-[color:var(--border)]/30"
              >
                <span className="text-[color:var(--muted)]">{j.id}</span>
                <span className={`flex items-center gap-2 ${actionColor}`}>
                  <span className={`pip ${statusClass}`} />
                  {j.action}
                </span>
                <span className="text-[color:var(--muted)] truncate">
                  {j.project ?? "-"}
                </span>
                <span className="text-right text-[color:var(--muted)]">
                  {j.when}
                </span>
                <span className="text-right text-[color:var(--muted)]">
                  {j.cost}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

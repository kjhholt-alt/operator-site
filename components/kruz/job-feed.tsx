type Job = {
  id: string;
  action: string;
  project: string | null;
  status: "ok" | "running" | "failed";
  when: string;
  cost: string;
};

// Representative recent-job feed. Real snapshot lands in Sprint 2.
const JOBS: Job[] = [
  { id: "j_9f4a12", action: "watchdog_tick", project: null, status: "ok", when: "26s ago", cost: "$0.00" },
  { id: "j_9f4a11", action: "review_prs", project: "prospector-pro", status: "ok", when: "58m ago", cost: "$0.14" },
  { id: "j_9f4a10", action: "deploy_check", project: "operator-core", status: "ok", when: "1h 02m", cost: "$0.02" },
  { id: "j_9f4a0f", action: "morning_briefing", project: null, status: "ok", when: "6h 12m", cost: "$0.41" },
  { id: "j_9f4a0e", action: "ci_triage_fix", project: "ai-ops-consulting", status: "failed", when: "6h 30m", cost: "$0.18" },
  { id: "j_9f4a0d", action: "dep_guardian", project: "outreach-engine", status: "ok", when: "8h 15m", cost: "$0.33" },
  { id: "j_9f4a0c", action: "strategic_advisor", project: null, status: "ok", when: "1d 14h", cost: "$0.87" },
  { id: "j_9f4a0b", action: "cost_report", project: null, status: "ok", when: "3d 2h", cost: "$0.12" },
];

export function JobFeed() {
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
        <div>
          <div className="eyebrow mb-1">JOB LEDGER / LAST 8</div>
          <h3 className="text-lg font-semibold">
            RECENT AGENT RUNS
            <span className="mono text-sm text-[color:var(--muted)] ml-3">
              24h cost $2.07
            </span>
          </h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span className="pip pip-ok scan-pulse" />
          SQLITE LEDGER
        </div>
      </div>

      <div className="mono text-xs space-y-1">
        <div className="grid grid-cols-[100px_1fr_140px_90px_70px] gap-3 text-[10px] tracking-wider text-[color:var(--muted)] pb-2 border-b border-[color:var(--border)]">
          <span>JOB_ID</span>
          <span>ACTION</span>
          <span>PROJECT</span>
          <span className="text-right">WHEN</span>
          <span className="text-right">COST</span>
        </div>
        {JOBS.map((j) => {
          const statusClass =
            j.status === "ok"
              ? "pip-ok"
              : j.status === "running"
                ? "pip-warn"
                : "pip-alert";
          const actionColor =
            j.status === "failed"
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
    </div>
  );
}

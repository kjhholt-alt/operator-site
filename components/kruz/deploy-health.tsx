type Deploy = {
  project: string;
  status: "ok" | "warn" | "alert";
  latency: string;
  host: string;
};

const DEPLOYS: Deploy[] = [
  { project: "operator-core", status: "ok", latency: "124ms", host: "local" },
  { project: "prospector-pro", status: "ok", latency: "96ms", host: "vercel" },
  { project: "ai-ops-consulting", status: "ok", latency: "142ms", host: "vercel" },
  { project: "pool-prospector", status: "ok", latency: "188ms", host: "vercel" },
  { project: "outdoor-crm", status: "warn", latency: "982ms", host: "railway" },
  { project: "outreach-engine", status: "ok", latency: "211ms", host: "railway" },
  { project: "pc-bottleneck", status: "ok", latency: "77ms", host: "vercel" },
  { project: "dealbrain", status: "ok", latency: "168ms", host: "vercel" },
];

export function DeployHealth() {
  return (
    <div className="panel p-6 h-full">
      <div className="flex items-start justify-between mb-5 gap-2">
        <div>
          <div className="eyebrow mb-1">DEPLOY HEALTH</div>
          <h3 className="text-lg font-semibold">{DEPLOYS.length} SERVICES</h3>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span className="pip pip-ok scan-pulse" />
          60s
        </div>
      </div>

      <div className="mono text-xs space-y-1.5">
        {DEPLOYS.map((d) => {
          const pipClass =
            d.status === "ok"
              ? "pip-ok"
              : d.status === "warn"
                ? "pip-warn"
                : "pip-alert";
          const latencyClass =
            d.status === "ok"
              ? "text-[color:var(--muted)]"
              : d.status === "warn"
                ? "text-[color:var(--warn)]"
                : "text-[color:var(--alert)]";
          return (
            <div
              key={d.project}
              className="flex items-center justify-between py-1.5 border-b border-[color:var(--border)]/30"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`pip ${pipClass}`} />
                <span className="truncate">{d.project}</span>
              </div>
              <div className="flex items-center gap-3 text-[color:var(--muted)]">
                <span className={latencyClass}>{d.latency}</span>
                <span className="text-[10px] opacity-60 uppercase">{d.host}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import type { SnapshotDeploy } from "@/lib/snapshot";

type Props = {
  deploys: SnapshotDeploy[];
  live: boolean;
};

export function DeployHealth({ deploys, live }: Props) {
  return (
    <div className="panel p-6 h-full">
      <div className="flex items-start justify-between mb-5 gap-2">
        <div>
          <div className="eyebrow mb-1">DEPLOY HEALTH</div>
          <h3 className="text-lg font-semibold">{deploys.length} SERVICES</h3>
          <p className="mono text-[11px] text-[color:var(--muted)] italic mt-1">
            Each production URL, HTTP-pinged from the daemon.
          </p>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] flex items-center gap-2">
          <span
            className={`pip ${live ? "pip-ok scan-pulse" : "pip-idle"}`}
          />
          60s
        </div>
      </div>

      {deploys.length === 0 ? (
        <div className="mono text-xs text-[color:var(--muted)] py-8 text-center">
          No services reporting.
        </div>
      ) : (
        <div className="mono text-xs space-y-1.5">
          {deploys.map((d) => {
            const pipClass =
              d.status === "ok"
                ? "pip-ok"
                : d.status === "warn"
                  ? "pip-warn"
                  : d.status === "alert"
                    ? "pip-alert"
                    : "pip-idle";
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
                  {d.latency && <span>{d.latency}</span>}
                  <span className="text-[10px] opacity-60 uppercase">
                    {d.host}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

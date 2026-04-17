import type { SnapshotTask } from "@/lib/snapshot";

export function TasksPanel({ tasks }: { tasks?: SnapshotTask[] }) {
  const rows = tasks ?? [];
  const enabled = rows.filter((t) => t.enabled).length;
  return (
    <div className="panel bracket-corners p-5">
      <header className="flex items-center justify-between mb-3">
        <div className="eyebrow flex items-center gap-2">
          <span className="pip pip-ok" />
          SCHEDULED TASKS
        </div>
        <div className="mono text-[10px] text-[color:var(--muted)]">
          {enabled}/{rows.length} ENABLED
        </div>
      </header>
      {rows.length === 0 ? (
        <p className="mono text-xs text-[color:var(--muted)]">
          (snapshot predates tasks panel — next publish will populate)
        </p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((t) => (
            <li
              key={t.key}
              className="mono text-[11px] flex items-center gap-3 py-0.5"
            >
              <span
                className={`pip ${
                  t.enabled ? "pip-ok" : "pip-idle"
                } flex-shrink-0`}
              />
              <span
                className={`w-44 truncate ${
                  t.enabled
                    ? "text-[color:var(--fg)]"
                    : "text-[color:var(--muted)] line-through"
                }`}
              >
                {t.key}
              </span>
              <span className="w-16 text-[color:var(--muted)]">
                {t.cadence}
              </span>
              <span className="w-14 text-[color:var(--muted)]">{t.time}</span>
              <span className="flex-1 text-[color:var(--muted)] truncate">
                {t.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

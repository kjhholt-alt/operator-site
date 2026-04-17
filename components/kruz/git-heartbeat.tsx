import type { SnapshotGitActivity } from "@/lib/snapshot";

function intensity(commits: number): string {
  if (commits === 0) return "bg-[color:var(--border)]";
  if (commits <= 2) return "bg-[color:var(--accent)]/30";
  if (commits <= 5) return "bg-[color:var(--accent)]/55";
  if (commits <= 10) return "bg-[color:var(--accent)]/75";
  return "bg-[color:var(--accent)]";
}

export function GitHeartbeat({
  activity,
}: {
  activity?: SnapshotGitActivity[];
}) {
  const rows = [...(activity ?? [])].sort(
    (a, b) => b.commits_7d - a.commits_7d,
  );
  const total = rows.reduce((s, r) => s + r.commits_7d, 0);
  return (
    <div className="panel bracket-corners p-5">
      <header className="flex items-center justify-between mb-3">
        <div className="eyebrow flex items-center gap-2">
          <span className="pip pip-ok" />
          GIT HEARTBEAT / 7d
        </div>
        <div className="mono text-[10px] text-[color:var(--muted)]">
          {total} COMMITS
        </div>
      </header>
      {rows.length === 0 ? (
        <p className="mono text-xs text-[color:var(--muted)]">
          (snapshot predates git-activity section — next publish will populate)
        </p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r) => (
            <li
              key={r.slug}
              className="mono text-[11px] flex items-center gap-3"
            >
              <span className="w-40 truncate">{r.slug}</span>
              <span
                className={`w-2 h-3 rounded-sm ${intensity(r.commits_7d)} flex-shrink-0`}
                title={`${r.commits_7d} commits in last 7 days`}
              />
              <span className="w-10 text-[color:var(--muted)]">
                {r.commits_7d}
              </span>
              <span className="flex-1 text-[color:var(--muted)] truncate">
                last {r.last_commit_age}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

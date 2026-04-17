import Link from "next/link";
import type {
  ReplyStatus,
  SnapshotRecentReply,
  SnapshotReplySummary,
} from "@/lib/snapshot";

type Props = {
  summary?: SnapshotReplySummary;
  recent?: SnapshotRecentReply[];
};

export function RepliesPanel({ summary, recent }: Props) {
  const s = summary ?? {
    unread: 0,
    drafting: 0,
    ready: 0,
    sent_7d: 0,
  };
  const rows = recent ?? [];
  const anyUnread = s.unread > 0;

  return (
    <section className="panel bracket-corners p-6 md:p-8 mb-6">
      <div className="eyebrow mb-2 flex items-center gap-3 flex-wrap">
        <span
          className={`pip ${anyUnread ? "pip-warn scan-pulse" : "pip-ok"}`}
        />
        OUTREACH REPLIES
        {anyUnread && (
          <span className="mono text-[10px] tracking-widest text-[color:var(--warn)]">
            {s.unread} UNREAD
          </span>
        )}
        <Link
          href="/ops/replies"
          className="ml-auto mono text-[10px] tracking-widest text-[color:var(--muted)] hover:text-[color:var(--accent-bright)]"
        >
          OPEN INBOX -&gt;
        </Link>
      </div>
      <p className="mono text-[11px] text-[color:var(--muted)] italic mb-4 leading-snug">
        Every inbound reply with a visible status, draft preview, and
        custom-DD notes. The first place to look every morning.
      </p>

      <div className="grid grid-cols-4 gap-3 md:gap-4 mb-5">
        <Stat label="UNREAD" value={s.unread} highlight={s.unread > 0} />
        <Stat label="DRAFTING" value={s.drafting} />
        <Stat label="READY" value={s.ready} highlight={s.ready > 0} />
        <Stat label="SENT / 7d" value={s.sent_7d} />
      </div>

      {rows.length === 0 ? (
        <p className="mono text-[11px] text-[color:var(--muted)] italic">
          [no data] — nothing in the ledger yet. First real reply landed
          2026-04-17 and it&apos;s about to seed the template library.
        </p>
      ) : (
        <ul className="divide-y divide-[color:var(--border)]">
          {rows.map((r) => (
            <li
              key={r.thread_id}
              className="py-3 flex items-start gap-4 first:pt-0 last:pb-0"
            >
              <StatusPip status={r.status} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-semibold truncate">{r.sender}</span>
                  <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider">
                    {formatAge(r.last_activity_at)}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--muted)] leading-snug truncate">
                  {r.subject}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="mono text-[9px] tracking-widest text-[color:var(--muted)]">
        {label}
      </div>
      <div
        className={`mono tabular-nums text-2xl font-bold ${
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

function StatusPip({ status }: { status: ReplyStatus }) {
  const color =
    status === "NEW"
      ? "bg-[color:var(--warn)]"
      : status === "DRAFTING"
        ? "bg-[color:var(--accent)]"
        : status === "READY"
          ? "bg-[color:var(--accent-bright)]"
          : status === "SENT"
            ? "bg-[color:var(--ok)]"
            : "bg-[color:var(--muted)]";
  return (
    <div className="flex flex-col items-center gap-1 pt-1 min-w-[68px]">
      <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
      <span className="mono text-[9px] tracking-widest text-[color:var(--muted)]">
        {status}
      </span>
    </div>
  );
}

function formatAge(iso: string): string {
  const t = new Date(iso).getTime();
  if (isNaN(t)) return "";
  const mins = (Date.now() - t) / 60000;
  if (mins < 1) return "just now";
  if (mins < 60) return `${Math.floor(mins)}m ago`;
  const hours = mins / 60;
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

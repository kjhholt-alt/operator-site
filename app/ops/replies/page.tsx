import Link from "next/link";
import { StatusBar } from "@/components/status-bar";
import { fetchLatestSnapshot } from "@/lib/snapshot";
import type { ReplyStatus, SnapshotRecentReply } from "@/lib/snapshot";
import { fetchReplyThreads, type ReplyThreadRow } from "@/lib/replies";

export const metadata = {
  title: "Operator // Reply inbox",
  description:
    "Every inbound outreach reply with visible status, draft preview, and custom-DD notes.",
};

export const revalidate = 60;

export default async function OpsRepliesPage() {
  const [snapshotRow, mirrored] = await Promise.all([
    fetchLatestSnapshot("kruz"),
    fetchReplyThreads(),
  ]);

  const summary = snapshotRow?.payload.replies_summary ?? {
    unread: 0,
    drafting: 0,
    ready: 0,
    sent_7d: 0,
  };
  const mirroredAvailable = mirrored !== null;
  const mirroredHasRows = (mirrored?.length ?? 0) > 0;
  const rows: DisplayRow[] = mirroredHasRows
    ? (mirrored as ReplyThreadRow[]).map((r) => ({
        thread_id: r.thread_id,
        sender: r.sender_name || r.sender_email,
        sender_email: r.sender_email,
        subject: r.subject,
        status: r.status,
        last_activity_at: r.last_activity_at,
        dd_notes_md: r.dd_notes_md,
        draft_preview: r.latest_draft_preview,
      }))
    : (snapshotRow?.payload.recent_replies ?? []).map(
        (r: SnapshotRecentReply) => ({
          thread_id: r.thread_id,
          sender: r.sender,
          sender_email: "",
          subject: r.subject,
          status: r.status,
          last_activity_at: r.last_activity_at,
          dd_notes_md: "",
          draft_preview: null,
        }),
      );

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar node="OPS-REPLIES" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8 mono text-xs text-[color:var(--muted)]">
          <Link href="/kruz" className="hover:text-[color:var(--accent)]">
            &lt;- /KRUZ
          </Link>
          <div className="flex gap-6">
            <Link href="/pitch" className="hover:text-[color:var(--accent)]">
              /PITCH
            </Link>
            <Link href="/docs" className="hover:text-[color:var(--accent)]">
              /DOCS
            </Link>
          </div>
        </div>

        <header className="mb-8">
          <div className="eyebrow mb-3 flex items-center gap-2">
            <span
              className={`pip ${
                summary.unread > 0 ? "pip-warn scan-pulse" : "pip-ok"
              }`}
            />
            REPLY INBOX / OUTREACH
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
            /ops/replies
          </h1>
          <p className="text-[color:var(--muted)] max-w-3xl leading-relaxed">
            Every inbound reply, every draft, every custom-DD note —
            visible in one place so nothing slips. Status moves NEW -&gt;
            DRAFTING -&gt; READY -&gt; SENT. No email leaves until you
            say it does.
          </p>
        </header>

        <section className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
          <StatBox label="UNREAD" value={summary.unread} highlight={summary.unread > 0} />
          <StatBox label="DRAFTING" value={summary.drafting} />
          <StatBox label="READY" value={summary.ready} highlight={summary.ready > 0} />
          <StatBox label="SENT / 7d" value={summary.sent_7d} />
        </section>

        {!mirroredAvailable && (
          <div className="panel p-4 mb-6 mono text-[11px] text-[color:var(--muted)] italic leading-snug">
            [note] The full Supabase-mirrored inbox is not yet populated.
            Showing the latest 3 threads from the daemon snapshot. Once
            the daemon starts writing to <code>outreach_reply_threads</code>,
            this view expands to every thread automatically.
          </div>
        )}

        {mirroredAvailable && !mirroredHasRows && (snapshotRow?.payload.recent_replies?.length ?? 0) > 0 && (
          <div className="panel p-4 mb-6 mono text-[11px] text-[color:var(--muted)] italic leading-snug">
            [note] The Supabase reply mirror is reachable but empty, so this
            page is falling back to the daemon snapshot instead of blanking
            the inbox. Once the daemon mirror sync catches up, the full thread
            list resumes automatically.
          </div>
        )}

        {rows.length === 0 ? (
          <div className="panel p-8 text-center">
            <div className="eyebrow mb-3">NOTHING IN THE INBOX YET</div>
            <p className="text-[color:var(--muted)] leading-relaxed max-w-xl mx-auto">
              First real reply landed 2026-04-17 and will seed the
              template library. New inbound replies show up here within
              60 seconds of the daemon ingesting them.
            </p>
          </div>
        ) : (
          <ul className="panel divide-y divide-[color:var(--border)]">
            {rows.map((r) => (
              <li key={r.thread_id} className="p-5 md:p-6">
                <div className="flex items-start gap-4 flex-wrap">
                  <StatusBadge status={r.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      <span className="font-semibold">{r.sender}</span>
                      {r.sender_email && (
                        <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider">
                          {r.sender_email}
                        </span>
                      )}
                      <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider ml-auto">
                        {formatAge(r.last_activity_at)}
                      </span>
                    </div>
                    <p className="text-sm md:text-base leading-snug">
                      {r.subject}
                    </p>
                    {r.draft_preview && (
                      <div className="mt-3 border-l-2 border-[color:var(--accent)] pl-3 text-sm text-[color:var(--muted)] leading-relaxed">
                        <div className="mono text-[9px] tracking-widest text-[color:var(--accent)] mb-1">
                          DRAFT PREVIEW
                        </div>
                        {truncate(r.draft_preview, 240)}
                      </div>
                    )}
                    {r.dd_notes_md && (
                      <div className="mt-3 mono text-[11px] text-[color:var(--muted)] leading-snug whitespace-pre-wrap">
                        <span className="text-[color:var(--accent)]">
                          DD //
                        </span>{" "}
                        {truncate(r.dd_notes_md, 200)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-12 pt-6 border-t border-[color:var(--border)] mono text-[10px] text-[color:var(--muted)] tracking-wider text-center">
          OPS / REPLIES — revalidates every 60s. Source: operator-core
          reply ledger.
        </footer>
      </main>
    </div>
  );
}

type DisplayRow = {
  thread_id: string;
  sender: string;
  sender_email: string;
  subject: string;
  status: ReplyStatus;
  last_activity_at: string;
  dd_notes_md: string;
  draft_preview: string | null;
};

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="panel p-4">
      <div className="mono text-[9px] tracking-widest text-[color:var(--muted)] mb-1">
        {label}
      </div>
      <div
        className={`mono tabular-nums text-3xl font-bold ${
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

function StatusBadge({ status }: { status: ReplyStatus }) {
  const color =
    status === "NEW"
      ? "border-[color:var(--warn)] text-[color:var(--warn)]"
      : status === "DRAFTING"
        ? "border-[color:var(--accent)] text-[color:var(--accent)]"
        : status === "READY"
          ? "border-[color:var(--accent-bright)] text-[color:var(--accent-bright)]"
          : status === "SENT"
            ? "border-[color:var(--ok)] text-[color:var(--ok)]"
            : "border-[color:var(--muted)] text-[color:var(--muted)]";
  return (
    <span
      className={`mono text-[10px] tracking-widest border px-2 py-1 ${color}`}
    >
      {status}
    </span>
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

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

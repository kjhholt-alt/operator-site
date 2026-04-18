import Link from "next/link";
import { StatusBar } from "@/components/status-bar";
import { FleetSparkline } from "@/components/fleet-sparkline";
import {
  fetchFleetMetrics,
  freshnessState,
  nurtureState,
  formatRelative,
  type FleetRow,
  type FreshnessState,
} from "@/lib/fleet";

export const metadata = {
  title: "Operator // Fleet dashboard",
  description:
    "Single-pane cross-product view of the 5-SaaS portfolio: sends, opens, replies, meetings, revenue.",
};

// Re-fetch every 60s in prod — matches /ops/replies revalidate cadence so
// the two surfaces stay in sync.
export const revalidate = 60;

const PIP_BY_STATE: Record<FreshnessState, string> = {
  ok: "pip-ok",
  warn: "pip-warn",
  alert: "pip-alert",
  idle: "pip-idle",
};

function pct(n: number, denom: number): string {
  if (!denom) return "-";
  return `${((n / denom) * 100).toFixed(1)}%`;
}

function tint(hex: string): string {
  // Guard against typos (need exactly 6 hex chars)
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "var(--accent)";
  return `#${hex}`;
}

type TotalsCell = {
  label: string;
  total_7d: number;
  total_30d: number;
  inline?: boolean;
};

export default async function FleetPage() {
  const rows = await fetchFleetMetrics();
  const available = rows !== null;
  const data: FleetRow[] = rows ?? [];

  const totalsCells: TotalsCell[] = [
    {
      label: "SENDS",
      total_7d: data.reduce((a, r) => a + r.sends_7d, 0),
      total_30d: data.reduce((a, r) => a + r.sends_30d, 0),
    },
    {
      label: "OPENS",
      total_7d: data.reduce((a, r) => a + r.opens_7d, 0),
      total_30d: data.reduce((a, r) => a + r.opens_30d, 0),
    },
    {
      label: "REPLIES",
      total_7d: data.reduce((a, r) => a + r.replies_7d, 0),
      total_30d: data.reduce((a, r) => a + r.replies_30d, 0),
    },
    {
      label: "MEETINGS",
      total_7d: data.reduce((a, r) => a + r.meetings_7d, 0),
      total_30d: data.reduce((a, r) => a + r.meetings_30d, 0),
    },
    {
      label: "REV / MO",
      total_7d: data.reduce((a, r) => a + r.revenue_monthly_usd, 0),
      total_30d: data.reduce((a, r) => a + r.revenue_monthly_usd, 0),
      inline: true,
    },
  ];

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar node="OPS-FLEET" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8 mono text-xs text-[color:var(--muted)]">
          <Link href="/kruz" className="hover:text-[color:var(--accent)]">
            &lt;- /KRUZ
          </Link>
          <div className="flex gap-6">
            <Link
              href="/ops/replies"
              className="hover:text-[color:var(--accent)]"
            >
              /OPS/REPLIES
            </Link>
            <Link href="/pitch" className="hover:text-[color:var(--accent)]">
              /PITCH
            </Link>
          </div>
        </div>

        <header className="mb-8">
          <div className="eyebrow mb-3 flex items-center gap-2">
            <span
              className={`pip ${
                available && data.length > 0 ? "pip-ok scan-pulse" : "pip-warn"
              }`}
            />
            FLEET / CROSS-PRODUCT
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
            /fleet
          </h1>
          <p className="text-[color:var(--muted)] max-w-3xl">
            One pane for the five-SaaS portfolio. Sends, opens, replies,
            meetings, revenue — normalized through{" "}
            <code className="mono text-[11px] text-[color:var(--accent)]">
              fleet_metrics_v
            </code>
            . 60-second revalidate.
          </p>
        </header>

        {!available ? (
          <div className="panel p-6 mb-10">
            <div className="eyebrow mb-2">SOURCE UNAVAILABLE</div>
            <p className="text-sm text-[color:var(--muted)]">
              The <code className="mono">fleet_metrics_v</code> view isn&apos;t
              reachable from this environment. Either{" "}
              <code className="mono">NEXT_PUBLIC_SUPABASE_URL</code> /{" "}
              <code className="mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
              aren&apos;t set, or the view hasn&apos;t been deployed to this
              project yet. Page is rendering the empty shell so layout
              regressions are still catchable.
            </p>
          </div>
        ) : null}

        {/* Totals row */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {totalsCells.map((c) => (
            <div key={c.label} className="panel bracket-corners p-4">
              <div className="eyebrow mb-1">{c.label}</div>
              <div className="mono text-2xl font-semibold">
                {c.inline
                  ? `$${c.total_30d.toLocaleString()}`
                  : c.total_7d.toLocaleString()}
              </div>
              <div className="mono text-[10px] text-[color:var(--muted)] mt-1">
                {c.inline
                  ? "active recurring"
                  : `${c.total_30d.toLocaleString()} in 30d`}
              </div>
            </div>
          ))}
        </section>

        {/* Per-product fleet table */}
        <section className="panel overflow-x-auto">
          <table className="w-full min-w-[1024px] text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border)] text-left">
                <Th>PRODUCT</Th>
                <Th>SENDS (7D / 30D)</Th>
                <Th className="hidden md:table-cell">OPENS</Th>
                <Th>REPLIES</Th>
                <Th>RPR</Th>
                <Th className="hidden lg:table-cell">MEETINGS</Th>
                <Th>REV / MO</Th>
                <Th>LAST REPLY</Th>
                <Th>NURTURE</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <ProductRow key={row.product_key} row={row} />
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-[color:var(--muted)] mono text-xs"
                  >
                    (no rows — view unreachable or empty)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <footer className="mt-12 mono text-[10px] text-[color:var(--muted)] flex flex-wrap gap-x-6 gap-y-2">
          <span>SOURCE // public.fleet_metrics_v</span>
          <span>REVALIDATE // 60s</span>
          <span>LEGEND // green = replied-in-30d, amber = sending-no-reply, red = high bounce</span>
        </footer>
      </main>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 eyebrow text-[color:var(--muted)] ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-top ${className}`}>{children}</td>
  );
}

function ProductRow({ row }: { row: FleetRow }) {
  const fresh = freshnessState(row);
  const nurture = nurtureState(row);
  // Sparkline proxy: [30d, 7d] shows the momentum direction without
  // needing a real daily histogram. Two-point series reads cleanly in 72x18.
  const sparkSends = [Math.max(0, row.sends_30d - row.sends_7d), row.sends_7d];
  const sparkReplies = [
    Math.max(0, row.replies_30d - row.replies_7d),
    row.replies_7d,
  ];
  const replyRate = pct(row.replies_30d, row.sends_30d);
  return (
    <tr className="border-t border-[color:var(--border)] hover:bg-[color:var(--surface-2)] transition-colors">
      <Td>
        <div className="flex items-center gap-3">
          <span
            className={`pip ${PIP_BY_STATE[fresh]}`}
            title={`freshness=${fresh}`}
          />
          <div>
            <div
              className="font-semibold text-[color:var(--foreground)] mono"
              style={{ color: tint(row.accent_hex) }}
            >
              {row.display_name}
            </div>
            <a
              href={row.deploy_url}
              target="_blank"
              rel="noreferrer"
              className="mono text-[10px] text-[color:var(--muted)] hover:text-[color:var(--accent)]"
            >
              {row.deploy_url.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
      </Td>
      <Td>
        <div className="mono flex items-center gap-3">
          <span className="text-[color:var(--foreground)]">
            {row.sends_7d.toLocaleString()}
          </span>
          <span className="text-[color:var(--muted)] text-[11px]">
            / {row.sends_30d.toLocaleString()}
          </span>
          <FleetSparkline
            values={sparkSends}
            className="text-[color:var(--accent)] ml-1"
          />
        </div>
      </Td>
      <Td className="hidden md:table-cell">
        <div className="mono">
          <span className="text-[color:var(--foreground)]">
            {row.opens_7d.toLocaleString()}
          </span>
          <span className="text-[color:var(--muted)] text-[11px] ml-2">
            / {row.opens_30d.toLocaleString()}
          </span>
        </div>
      </Td>
      <Td>
        <div className="mono flex items-center gap-3">
          <span className="text-[color:var(--foreground)]">
            {row.replies_7d.toLocaleString()}
          </span>
          <span className="text-[color:var(--muted)] text-[11px]">
            / {row.replies_30d.toLocaleString()}
          </span>
          <FleetSparkline
            values={sparkReplies}
            className="text-[color:var(--ok)] ml-1"
          />
        </div>
      </Td>
      <Td>
        <span className="mono text-[color:var(--muted)]">{replyRate}</span>
      </Td>
      <Td className="hidden lg:table-cell">
        <span className="mono">
          {row.meetings_7d.toLocaleString()}
          <span className="text-[color:var(--muted)] text-[11px] ml-2">
            / {row.meetings_30d.toLocaleString()}
          </span>
        </span>
      </Td>
      <Td>
        <span className="mono">
          {row.revenue_monthly_usd > 0
            ? `$${row.revenue_monthly_usd.toLocaleString()}`
            : "-"}
        </span>
        {row.subs_active > 0 && (
          <div className="mono text-[10px] text-[color:var(--muted)]">
            {row.subs_active} sub{row.subs_active === 1 ? "" : "s"}
          </div>
        )}
      </Td>
      <Td>
        <span className="mono">{formatRelative(row.last_reply_at)}</span>
      </Td>
      <Td>
        <span
          className={`mono text-[10px] inline-flex items-center gap-2 px-2 py-1 border border-[color:var(--border)] rounded`}
        >
          <span className={`pip ${PIP_BY_STATE[nurture]}`} />
          {nurture.toUpperCase()}
        </span>
      </Td>
    </tr>
  );
}

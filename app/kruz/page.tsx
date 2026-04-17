import Link from "next/link";
import { StatusBar } from "@/components/status-bar";
import { WatchdogPanel } from "@/components/kruz/watchdog-panel";
import { JobFeed } from "@/components/kruz/job-feed";
import { DeployHealth } from "@/components/kruz/deploy-health";
import { PortfolioRoster } from "@/components/kruz/portfolio-roster";
import { RecentSprint } from "@/components/kruz/recent-sprint";
import { TasksPanel } from "@/components/kruz/tasks-panel";
import { GitHeartbeat } from "@/components/kruz/git-heartbeat";
import { SpendSparkline } from "@/components/kruz/spend-sparkline";
import { HeroSummary } from "@/components/kruz/hero-summary";
import { RevenueHeartbeat } from "@/components/kruz/revenue-heartbeat";
import {
  fetchLatestSnapshot,
  snapshotAgeMinutes,
  type SnapshotPayload,
} from "@/lib/snapshot";

export const metadata = {
  title: "Operator // KRUZ - live portfolio broadcast",
  description:
    "The daemon running in production on one founder's actual multi-project portfolio.",
};

// Refresh the rendered snapshot every 60s. The publisher on Kruz's machine
// writes a new row on whatever cadence it's scheduled for (~30 min).
export const revalidate = 60;

const FALLBACK: SnapshotPayload = {
  generated_at: new Date().toISOString(),
  summary: {
    projects: 0,
    tracked_sections: 0,
    jobs_24h: 0,
    cost_24h_usd: 0,
  },
  watchdog: [],
  jobs: [],
  deploy_health: [],
  portfolio: [],
  daemon: { pid: null, started_at: null, uptime_sec: 0 },
};

function formatAge(minutes: number): string {
  if (!isFinite(minutes) || minutes < 0) return "offline";
  if (minutes < 1) return "< 1m ago";
  if (minutes < 60) return `${Math.floor(minutes)}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${Math.floor(minutes % 60)}m ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h ago`;
}

export default async function KruzPage() {
  const row = await fetchLatestSnapshot("kruz");
  const snapshot = row?.payload ?? FALLBACK;
  const ageMinutes = row ? snapshotAgeMinutes(row.published_at) : Infinity;
  const live = !!row && ageMinutes < 120;
  const stale = !!row && ageMinutes >= 120;

  const projects = snapshot.summary.projects ?? 0;
  const jobs24h = snapshot.summary.jobs_24h ?? 0;
  const tasksEnabled = snapshot.summary.tasks_enabled ?? 0;
  const tasksTotal = snapshot.summary.tasks_total ?? (snapshot.tasks?.length ?? 0);
  const cost7d = snapshot.summary.cost_7d_usd ?? 0;
  const mrr7d = snapshot.summary.mrr_7d_usd ?? 0;
  const nodeLabel = live ? "KRUZ" : stale ? "KRUZ-STALE" : "KRUZ-OFFLINE";

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar node={nodeLabel} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <section className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span
                className={`pip ${
                  live ? "pip-ok scan-pulse" : stale ? "pip-warn" : "pip-idle"
                }`}
              />
              {live ? "LIVE BROADCAST" : stale ? "SNAPSHOT STALE" : "OFFLINE"} /
              OPERATOR NODE
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              /kruz
            </h1>
            <p className="text-sm text-[color:var(--muted)] mt-1 mono">
              ONE FOUNDER. {snapshot.summary.projects || "—"} PROJECTS. ONE DAEMON.
            </p>
            <p className="text-xs text-[color:var(--muted)] mt-1 mono">
              {row
                ? `LAST SNAPSHOT ${formatAge(ageMinutes)}`
                : "NO SNAPSHOT AVAILABLE"}
            </p>
          </div>
          <Link href="/" className="btn-ghost no-underline">
            &lt;- HOME
          </Link>
        </section>

        <HeroSummary
          projects={projects}
          jobs24h={jobs24h}
          tasksEnabled={tasksEnabled}
          tasksTotal={tasksTotal}
          cost7dUsd={cost7d}
          mrr7dUsd={mrr7d}
        />

        {/* Watchdog + deploy health row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <WatchdogPanel sections={snapshot.watchdog} live={live} />
          </div>
          <DeployHealth deploys={snapshot.deploy_health} live={live} />
        </section>

        {/* Job feed + portfolio roster */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <JobFeed
              jobs={snapshot.jobs}
              cost24h={snapshot.summary.cost_24h_usd}
              live={live}
            />
          </div>
          <PortfolioRoster roster={snapshot.portfolio} />
        </section>

        {/* v2: tasks + git heartbeat + claude spend */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <TasksPanel tasks={snapshot.tasks} />
          </div>
          <SpendSparkline
            series={snapshot.cost_series_7d}
            cost7dUsd={snapshot.summary.cost_7d_usd}
            cost24hUsd={snapshot.summary.cost_24h_usd}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 mb-6">
          <RevenueHeartbeat rows={snapshot.revenue_7d ?? []} />
        </section>

        <section className="grid grid-cols-1 gap-4 mb-6">
          <GitHeartbeat activity={snapshot.git_activity} />
        </section>

        {/* Recent sprint */}
        <section className="mb-10">
          <RecentSprint />
        </section>

        <footer className="mt-12 pt-6 border-t border-[color:var(--border)] mono text-xs text-[color:var(--muted)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`pip ${
                  live ? "pip-ok scan-pulse" : stale ? "pip-warn" : "pip-idle"
                }`}
              />
              <span>
                {live
                  ? "LIVE // REVALIDATES 60s"
                  : stale
                    ? "SNAPSHOT STALE // CHECK DAEMON"
                    : "WAITING ON FIRST SNAPSHOT"}
              </span>
            </div>
            <div className="flex gap-3 md:gap-4 items-center flex-wrap">
              <Link
                href="https://github.com/kjhholt-alt/operator-core"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[color:var(--accent)]/50 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 text-[color:var(--accent-bright)] no-underline rounded-sm tracking-wider transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="pip pip-ok" />
                BUILT IN PUBLIC // STAR SOURCE
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-bright)] no-underline rounded-sm tracking-wider transition-colors"
              >
                READ THE DOCS -&gt;
              </Link>
              <Link
                href="/pitch"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-bright)] no-underline rounded-sm tracking-wider transition-colors"
              >
                WHAT&apos;S THE PITCH?
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-wider">
            <span>
              OPERATOR / v0.1.0 / PRE-ALPHA — self-hosted, MIT-licensed, no
              vendor lock-in.
            </span>
            <Link href="/" className="hover:text-[color:var(--accent)]">
              &lt;- HOME
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

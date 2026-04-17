import Link from "next/link";
import { StatusBar } from "@/components/status-bar";
import { WatchdogPanel } from "@/components/kruz/watchdog-panel";
import { JobFeed } from "@/components/kruz/job-feed";
import { DeployHealth } from "@/components/kruz/deploy-health";
import { PortfolioRoster } from "@/components/kruz/portfolio-roster";
import { RecentSprint } from "@/components/kruz/recent-sprint";

export const metadata = {
  title: "Operator // KRUZ — live portfolio broadcast",
  description:
    "The daemon running in production on one founder's actual multi-project portfolio.",
};

// Sprint 1 ships with SNAPSHOT data. Sprint 2 wires this to the live daemon
// via a published snapshot JSON. Keeping the component interface stable so
// the swap is mechanical.

export default function KruzPage() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <section className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="pip pip-ok scan-pulse" />
              LIVE BROADCAST / OPERATOR NODE
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              /kruz
            </h1>
            <p className="text-sm text-[color:var(--muted)] mt-1 mono">
              ONE FOUNDER. 15 PROJECTS. ONE DAEMON.
            </p>
          </div>
          <Link
            href="/"
            className="btn-ghost no-underline"
          >
            &lt;- HOME
          </Link>
        </section>

        {/* Watchdog + deploy health row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <WatchdogPanel />
          </div>
          <DeployHealth />
        </section>

        {/* Job feed + portfolio roster */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <JobFeed />
          </div>
          <PortfolioRoster />
        </section>

        {/* Recent sprint */}
        <section className="mb-10">
          <RecentSprint />
        </section>

        <footer className="mt-12 pt-6 border-t border-[color:var(--border)] mono text-xs text-[color:var(--muted)] flex flex-wrap items-center justify-between gap-4">
          <div>
            SNAPSHOT MODE // LIVE SYNC COMING SPRINT 2
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[color:var(--accent)]">
              HOME
            </Link>
            <Link
              href="https://github.com/kjhholt-alt/operator-core"
              className="hover:text-[color:var(--accent)]"
              target="_blank"
              rel="noreferrer"
            >
              SOURCE
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

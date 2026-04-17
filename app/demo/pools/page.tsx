import Link from "next/link";
import { StatusBar } from "@/components/status-bar";
import { HeroSummary } from "@/components/kruz/hero-summary";
import {
  POOL_HERO,
  POOL_LEADS,
  POOL_HEALTH,
  POOL_CHECKLIST,
  POOL_WEEKLY_BRIEF,
} from "@/lib/pools-demo";

export const metadata = {
  title: "Operator // Pool installer demo broadcast",
  description:
    "A fictional fiberglass pool installer running Operator — leads, customer health, seasonal checklist, weekly brief. No real names; static demo for a sales conversation.",
};

export const dynamic = "force-static";

export default function PoolsDemoPage() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar node="DEMO-POOLS" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 md:py-12">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-8 mono text-xs text-[color:var(--muted)]">
          <Link href="/pitch" className="hover:text-[color:var(--accent)]">
            &lt;- PITCH
          </Link>
          <div className="flex gap-6">
            <Link href="/kruz" className="hover:text-[color:var(--accent)]">
              /KRUZ
            </Link>
            <Link href="/docs" className="hover:text-[color:var(--accent)]">
              /DOCS
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="eyebrow mb-3 flex items-center gap-2">
            <span className="pip pip-ok scan-pulse" />
            POOL INSTALLER / DEMO BROADCAST
            <span className="ml-3 px-2 py-0.5 border border-[color:var(--warn)] text-[color:var(--warn)] text-[9px] tracking-widest">
              THIS IS A DEMO
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
            Lakeside Fiberglass
          </h1>
          <p className="text-[color:var(--muted)] max-w-3xl leading-relaxed">
            A fictional fiberglass pool installer running Operator. Every
            number, name, and address on this page is invented — this is the
            shape of the daemon running against a real install, scoring leads
            and nudging customers while the owner is on a job site.
          </p>
        </header>

        <HeroSummary
          projects={POOL_HERO.projects}
          jobs24h={POOL_HERO.jobs24h}
          tasksEnabled={POOL_HERO.tasksEnabled}
          tasksTotal={POOL_HERO.tasksTotal}
          cost7dUsd={POOL_HERO.cost7dUsd}
        />

        {/* Today's leads */}
        <section className="panel bracket-corners p-6 md:p-8 mb-6">
          <div className="eyebrow mb-2 flex items-center gap-2">
            <span className="pip pip-ok" />
            TODAY&apos;S LEADS / SCORED BY CLAUDE
          </div>
          <p className="mono text-[11px] text-[color:var(--muted)] italic mb-4 leading-snug">
            Every inbound form, call, or referral scored hot / warm / cold with
            a reason — so the owner knows which one to touch first.
          </p>
          <ul className="divide-y divide-[color:var(--border)]">
            {POOL_LEADS.map((l) => (
              <li
                key={l.name}
                className="py-3 flex items-start gap-4 first:pt-0 last:pb-0"
              >
                <TempPip temp={l.temp} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-semibold">{l.name}</span>
                    <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider">
                      {l.source}
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed mt-1">
                    {l.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Customer health */}
        <section className="panel bracket-corners p-6 md:p-8 mb-6">
          <div className="eyebrow mb-2 flex items-center gap-2">
            <span className="pip pip-ok" />
            CUSTOMER HEALTH / PAST INSTALLS
          </div>
          <p className="mono text-[11px] text-[color:var(--muted)] italic mb-4 leading-snug">
            Green = touched in the last 60 days. Yellow = 60-120. Red = 120+
            days of radio silence. Operator watches so the ones going cold
            don&apos;t end up in a competitor&apos;s truck.
          </p>
          <ul className="divide-y divide-[color:var(--border)]">
            {POOL_HEALTH.map((h) => (
              <li
                key={h.household}
                className="py-3 flex items-start gap-4 first:pt-0 last:pb-0"
              >
                <HealthPip state={h.state} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-semibold">{h.household}</span>
                    <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider">
                      LAST TOUCH {h.last_touch.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed mt-1">
                    {h.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Seasonal checklist */}
        <section className="panel bracket-corners p-6 md:p-8 mb-6">
          <div className="eyebrow mb-2 flex items-center gap-2">
            <span className="pip pip-ok" />
            SEASONAL CHECKLIST / NEXT 14 DAYS
          </div>
          <p className="mono text-[11px] text-[color:var(--muted)] italic mb-4 leading-snug">
            Rituals the owner never has to remember. Salt cells, seasonal
            openings, winter covers, permit renewals — all pre-scheduled.
          </p>
          <ul className="space-y-4">
            {POOL_CHECKLIST.map((c) => (
              <li key={c.title} className="flex items-start gap-4">
                <span className="mono text-[10px] text-[color:var(--accent)] tracking-wider min-w-[84px] pt-1">
                  {c.due.toUpperCase()}
                </span>
                <div className="flex-1">
                  <div className="font-semibold">{c.title}</div>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed mt-1">
                    {c.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Weekly brief */}
        <section className="panel bracket-corners p-6 md:p-8 mb-6">
          <div className="eyebrow mb-2 flex items-center gap-2">
            <span className="pip pip-ok scan-pulse" />
            WEEKLY BRIEF / CLAUDE-AUTHORED
          </div>
          <p className="mono text-[11px] text-[color:var(--muted)] italic mb-4 leading-snug">
            Every Sunday evening, one paragraph — the shape of the week, the
            hotspots, the single move for Monday.
          </p>
          <blockquote className="border-l-2 border-[color:var(--accent)] pl-4 text-[color:var(--muted)] leading-relaxed">
            {POOL_WEEKLY_BRIEF}
          </blockquote>
        </section>

        {/* Footer CTA */}
        <section className="bracket-corners panel p-6 md:p-8 mb-8">
          <div className="eyebrow mb-3">NEXT STEPS</div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            The real one looks the same. It just runs against your data.
          </h2>
          <p className="text-[color:var(--muted)] mb-5 max-w-2xl leading-relaxed">
            Operator is self-hosted and MIT-licensed. The same panels you see
            here — leads, customer health, checklist, weekly brief — spawn off
            recipes you can rewrite. No SaaS in the middle, no vendor moat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pitch"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[color:var(--accent)] bg-[color:var(--accent)]/10 hover:bg-[color:var(--accent)]/20 text-[color:var(--accent-bright)] no-underline rounded-sm mono tracking-wider transition-colors"
            >
              READ THE PITCH -&gt;
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-bright)] no-underline rounded-sm mono tracking-wider transition-colors"
            >
              READ THE DOCS -&gt;
            </Link>
            <Link
              href="/kruz"
              className="inline-flex items-center gap-2 px-5 py-3 mono text-[color:var(--muted)] hover:text-[color:var(--accent)] no-underline tracking-wider"
            >
              SEE THE LIVE BROADCAST /KRUZ -&gt;
            </Link>
          </div>
        </section>

        <footer className="mt-8 pt-6 border-t border-[color:var(--border)] mono text-[10px] text-[color:var(--muted)] tracking-wider text-center">
          OPERATOR / v0.1.0 / PRE-ALPHA — demo data, no real customers on this
          page.
        </footer>
      </main>
    </div>
  );
}

function TempPip({ temp }: { temp: "hot" | "warm" | "cold" }) {
  const color =
    temp === "hot"
      ? "bg-[color:var(--alert)]"
      : temp === "warm"
        ? "bg-[color:var(--warn)]"
        : "bg-[color:var(--muted)]";
  const label = temp.toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1 pt-1 min-w-[44px]">
      <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
      <span className="mono text-[9px] tracking-widest text-[color:var(--muted)]">
        {label}
      </span>
    </div>
  );
}

function HealthPip({ state }: { state: "ok" | "warn" | "alert" }) {
  const color =
    state === "ok"
      ? "bg-[color:var(--ok)]"
      : state === "warn"
        ? "bg-[color:var(--warn)]"
        : "bg-[color:var(--alert)]";
  const label =
    state === "ok" ? "OK" : state === "warn" ? "WARN" : "ALERT";
  return (
    <div className="flex flex-col items-center gap-1 pt-1 min-w-[52px]">
      <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
      <span className="mono text-[9px] tracking-widest text-[color:var(--muted)]">
        {label}
      </span>
    </div>
  );
}

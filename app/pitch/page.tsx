import Link from "next/link";
import { StatusBar } from "@/components/status-bar";

export const metadata = {
  title: "Operator // Pitch — one daemon, every business you run",
  description:
    "For operators running two or three businesses at once: Operator is the background process that actually watches all of them — lead scoring, customer health, deploy status, weekly state-of-the-businesses brief.",
};

export default function PitchPage() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar node="PITCH" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 md:py-16">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-10 mono text-xs text-[color:var(--muted)]">
          <Link href="/" className="hover:text-[color:var(--accent)]">
            &lt;- HOME
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

        {/* Hero */}
        <section className="bracket-corners panel p-8 md:p-12 mb-10">
          <div className="eyebrow mb-4 flex items-center gap-2">
            <span className="pip pip-ok scan-pulse" />
            FOR MULTI-BUSINESS OPERATORS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            One daemon.
            <br />
            <span className="text-[color:var(--accent)]">Every</span>{" "}
            business you run.
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--muted)] max-w-3xl leading-relaxed">
            If you own more than one thing — a franchise, a service company, a
            side project, a real-estate LLC — you&apos;re the only person holding
            the whole map. Operator is the background process that watches all
            of it so you can sleep.
          </p>
        </section>

        {/* What it IS */}
        <section className="mb-12">
          <div className="eyebrow mb-3">01 / WHAT IT IS</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            A self-hosted daemon watching N things at once.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              label="SCHEDULES"
              title="Daily rituals"
              body="Morning briefing at 7am. Deploy check at 9. Weekly state-of-the-businesses email on Sundays. You pick the cadence; Operator keeps them running."
            />
            <Card
              label="WATCHES"
              title="Every surface"
              body="Production URLs, customer lists, inbox volume, revenue dashboards, deploy status. Anything with an API or a health endpoint."
            />
            <Card
              label="ACTS"
              title="On your rules"
              body="Tier 1: notify only. Tier 2: draft a reply, wait for you to send. Tier 3: auto-merge, auto-email, auto-invoice. You choose per-workflow."
            />
          </div>
        </section>

        {/* What it does for author today */}
        <section className="mb-12">
          <div className="eyebrow mb-3">02 / WHAT IT DOES TODAY</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Running live on the author&apos;s portfolio right now.
          </h2>
          <div className="panel p-6 md:p-8">
            <ul className="space-y-3 mono text-sm md:text-base leading-relaxed">
              <Li>
                Morning briefing — every workday, a digest of every project:
                what moved, what broke, what needs a human today.
              </Li>
              <Li>
                Deploy health — every production URL HTTP-pinged every 15
                minutes; pages land in Discord the second one flips red.
              </Li>
              <Li>
                Sprint tracker — 90-minute work-block timer, commit-since-start
                heartbeat, auto-generated handoff docs at session end.
              </Li>
              <Li>
                Auto-PR review — Claude reads every pull request, comments the
                concerns, flags the risky diffs, approves the boring ones.
              </Li>
              <Li>
                Claude spend — running ledger of every agent invocation so the
                bill never surprises you.
              </Li>
              <Li>
                Public broadcast — a read-only page the operator can share with
                partners, investors, or family so the entire portfolio is
                visible in one screen.{" "}
                <Link
                  href="/kruz"
                  className="text-[color:var(--accent-bright)] underline underline-offset-2"
                >
                  See it live →
                </Link>
              </Li>
            </ul>
          </div>
        </section>

        {/* What it COULD do for a small-business owner */}
        <section className="mb-12">
          <div className="eyebrow mb-3">03 / WHAT IT COULD DO FOR YOU</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            If you run more than one business, here&apos;s the shape.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UseCase
              kind="FRANCHISE / MULTI-LOCATION"
              title="Lead scoring across every location"
              bullets={[
                "Watch inbound forms, calls, and walk-ins at each store.",
                "Score each lead: hot / warm / cold with a reason.",
                "Draft the follow-up email in your voice. You approve with one click.",
                "Roll up a weekly per-location scoreboard so you know who's actually closing.",
              ]}
            />
            <UseCase
              kind="FIELD SERVICES / RECURRING CUSTOMERS"
              title="Customer-health nudges"
              bullets={[
                "Daily sweep over your CRM for customers going cold.",
                "Detects no-contact windows, missed renewals, stalled invoices.",
                "Drafts the right nudge — service reminder, seasonal check-in, referral ask.",
                "Flags the 3 accounts most likely to churn this week.",
              ]}
            />
            <UseCase
              kind="ACROSS EVERYTHING"
              title="State-of-the-businesses brief"
              bullets={[
                "Sunday evening, one page to your phone or inbox.",
                "Revenue delta per business, deploys this week, new leads, new invoices.",
                "Anything outside normal ranges flagged with a one-line story.",
                "You read it in two minutes and you know exactly where Monday starts.",
              ]}
            />
          </div>
        </section>

        {/* Why this is different */}
        <section className="mb-12">
          <div className="eyebrow mb-3">04 / WHY THIS IS DIFFERENT</div>
          <div className="panel p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Contrast
                bad="Another SaaS dashboard"
                good="A daemon on a machine you control"
                note="No vendor moat. Your data never leaves your hardware unless you tell it to."
              />
              <Contrast
                bad="Automations that run once"
                good="A persistent background process"
                note="Operator is alive 24/7. It notices things between your check-ins — that&apos;s the whole point."
              />
              <Contrast
                bad="AI that hallucinates at you"
                good="Agents that run against your real data"
                note="Every recommendation quotes the source — the email, the row, the commit. You can always verify."
              />
              <Contrast
                bad="One-size-fits-all templates"
                good="Recipes tuned to your actual workflow"
                note="Operator ships with sensible defaults, but every task is a text file you can rewrite. It speaks your ops language."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bracket-corners panel p-8 md:p-10 mb-10">
          <div className="eyebrow mb-3">05 / NEXT STEPS</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to see the live one first?
          </h2>
          <p className="text-[color:var(--muted)] mb-6 max-w-2xl">
            /kruz is the author&apos;s actual portfolio — same daemon, same code,
            same Claude agents you&apos;d run on your own businesses. /docs is
            how it gets onto your machine.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/kruz"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[color:var(--accent)] bg-[color:var(--accent)]/10 hover:bg-[color:var(--accent)]/20 text-[color:var(--accent-bright)] no-underline rounded-sm mono tracking-wider transition-colors"
            >
              <span className="pip pip-ok scan-pulse" />
              SEE IT LIVE / KRUZ -&gt;
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-bright)] no-underline rounded-sm mono tracking-wider transition-colors"
            >
              READ THE DOCS -&gt;
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 mono text-[color:var(--muted)] hover:text-[color:var(--accent)] no-underline tracking-wider"
            >
              &lt;- HOME
            </Link>
          </div>
        </section>

        <footer className="mt-16 pt-6 border-t border-[color:var(--border)] mono text-[10px] text-[color:var(--muted)] tracking-wider text-center">
          OPERATOR / v0.1.0 / PRE-ALPHA — self-hosted, MIT-licensed, no vendor
          lock-in.
        </footer>
      </main>
    </div>
  );
}

function Card({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="panel p-5 h-full">
      <div className="eyebrow mb-2">{label}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[color:var(--muted)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function UseCase({
  kind,
  title,
  bullets,
}: {
  kind: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="panel bracket-corners p-5 h-full">
      <div className="eyebrow mb-2">{kind}</div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="mono text-xs text-[color:var(--muted)] space-y-2 leading-relaxed">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-[color:var(--accent)] flex-shrink-0">
              &gt;
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contrast({
  bad,
  good,
  note,
}: {
  bad: string;
  good: string;
  note: string;
}) {
  return (
    <div>
      <div className="mono text-[11px] text-[color:var(--muted)] tracking-wider mb-2">
        <span className="line-through opacity-70">{bad}</span>{" "}
        <span className="text-[color:var(--accent)]">→</span>{" "}
        <span className="text-[color:var(--accent-bright)]">{good}</span>
      </div>
      <p className="text-sm text-[color:var(--muted)] leading-relaxed">
        {note}
      </p>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="text-[color:var(--accent)] flex-shrink-0 mt-0.5">
        &gt;
      </span>
      <span>{children}</span>
    </li>
  );
}

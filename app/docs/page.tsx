import Link from "next/link";
import { StatusBar } from "@/components/status-bar";

export const metadata = {
  title: "Operator // DOCS",
  description:
    "Architecture, installation, task cookbook, CLI reference for Operator Core.",
};

function SectionHead({
  n,
  title,
  sub,
  id,
}: {
  n: string;
  title: string;
  sub?: string;
  id: string;
}) {
  return (
    <header className="mb-5" id={id}>
      <div className="eyebrow flex items-center gap-3 mb-2">
        <span className="pip pip-ok" />
        {n} / {title.toUpperCase()}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {sub && (
        <p className="text-sm text-[color:var(--muted)] mt-1 mono">{sub}</p>
      )}
    </header>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="panel bracket-corners p-4 mono text-[12px] text-[color:var(--fg)] overflow-x-auto whitespace-pre">
      {children}
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <section className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="pip pip-ok scan-pulse" />
              DOCS / OPERATOR-CORE
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              /docs
            </h1>
            <p className="text-sm text-[color:var(--muted)] mt-1 mono">
              Run the same daemon I run. Local-first. Pre-alpha. Tools for
              multi-project founders.
            </p>
          </div>
          <Link href="/" className="btn-ghost no-underline">
            &lt;- HOME
          </Link>
        </section>

        {/* TOC */}
        <section className="panel bracket-corners p-5 mb-10">
          <div className="eyebrow mb-3">/ INDEX</div>
          <ol className="mono text-sm space-y-1.5">
            <li>
              <a href="#architecture" className="hover:text-[color:var(--accent)]">
                01 / architecture
              </a>
            </li>
            <li>
              <a href="#install" className="hover:text-[color:var(--accent)]">
                02 / install
              </a>
            </li>
            <li>
              <a href="#config" className="hover:text-[color:var(--accent)]">
                03 / config
              </a>
            </li>
            <li>
              <a href="#run" className="hover:text-[color:var(--accent)]">
                04 / run the daemon
              </a>
            </li>
            <li>
              <a href="#tasks" className="hover:text-[color:var(--accent)]">
                05 / scheduled tasks
              </a>
            </li>
            <li>
              <a href="#cli" className="hover:text-[color:var(--accent)]">
                06 / cli reference
              </a>
            </li>
            <li>
              <a href="#integrations" className="hover:text-[color:var(--accent)]">
                07 / integrations
              </a>
            </li>
            <li>
              <a href="#philosophy" className="hover:text-[color:var(--accent)]">
                08 / philosophy
              </a>
            </li>
          </ol>
        </section>

        {/* 01 Architecture */}
        <section className="mb-12">
          <SectionHead
            n="01"
            title="Architecture"
            sub="One long-running Python daemon. Seven surfaces."
            id="architecture"
          />
          <p className="text-sm text-[color:var(--muted)] mb-4">
            Operator Core is a single process that boots seven threads. Each is
            optional — drop any of them with a CLI flag — and failure in one
            does not take down the rest.
          </p>

          <pre className="panel bracket-corners p-4 mono text-[11px] leading-[1.55] text-[color:var(--fg)] overflow-x-auto whitespace-pre">
{`                           operator run
                                 |
      +---------------+----------+----------+---------------+
      |               |                     |               |
  HTTP hooks     Scheduler       Snapshot publisher    Discord bot
  (:8765)        (cron)          (30-min -> Supabase)  (optional)
      |               |                     |               |
      +------+--------+---------------------+-------+-------+
             |                                      |
       JobStore (sqlite)                    operator-site /kruz
       ~/.operator/data/                    (public broadcast)

 hooks   -> /api/hooks/*                   (Claude Code hook endpoints)
 status  -> /api/status                    (local read-only status)
 metrics -> /api/metrics                   (prometheus-flavored)
 remote  -> /api/remote                    (remote trigger bridge)
 ops UI  -> /ops                           (local dashboard)
`}
          </pre>

          <p className="text-sm text-[color:var(--muted)] mt-4">
            Data at rest:{" "}
            <code className="mono">~/.operator/config.toml</code> is the only
            knob the daemon reads;{" "}
            <code className="mono">~/.operator/data/</code> holds the sqlite
            ledger, status.json, scheduler state, and rotating logs. Nothing
            else on your box is touched.
          </p>
        </section>

        {/* 02 Install */}
        <section className="mb-12">
          <SectionHead
            n="02"
            title="Install"
            sub="Python 3.11+. Works on macOS, Linux, Windows."
            id="install"
          />
          <p className="text-sm text-[color:var(--muted)] mb-3">
            Install from source today (PyPI release coming). Clone the repo
            and use an editable install so updates are{" "}
            <code className="mono">git pull</code> away.
          </p>
          <Code>{`git clone https://github.com/kjhholt-alt/operator-core.git
cd operator-core
pip install -e .[discord,status]        # optional extras
operator version                        # sanity check`}</Code>
        </section>

        {/* 03 Config */}
        <section className="mb-12">
          <SectionHead
            n="03"
            title="Config"
            sub="One TOML file. Versionable. No secrets inside."
            id="config"
          />
          <Code>{`operator init                            # writes ~/.operator/config.toml
$EDITOR ~/.operator/config.toml          # fill in projects_root + projects
operator doctor                          # validate env + connectivity`}</Code>
          <p className="text-sm text-[color:var(--muted)] mt-3">
            Secrets (Supabase keys, Discord webhooks, bot tokens) live in
            environment variables — the daemon reads <code className="mono">.env</code>{" "}
            from the working directory on startup.
          </p>
        </section>

        {/* 04 Run */}
        <section className="mb-12">
          <SectionHead
            n="04"
            title="Run the daemon"
            sub="Foreground by default. Use your OS scheduler for background."
            id="run"
          />
          <Code>{`operator run                             # foreground, all surfaces on
operator run --once                      # boot + one snapshot + exit
operator run --no-discord --no-scheduler # surfaces off for debugging
operator snapshot                        # publish one snapshot now`}</Code>
          <p className="text-sm text-[color:var(--muted)] mt-3 leading-relaxed">
            For always-on operation, wire it into the OS:
          </p>
          <ul className="mono text-[12px] text-[color:var(--muted)] space-y-1 ml-4 mt-2">
            <li>
              • <span className="text-[color:var(--fg)]">Windows:</span>{" "}
              <code>scripts/Register-Operator.ps1</code> registers a
              respawn-every-5-min Task Scheduler job with a pid guard (no
              elevation required).
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">macOS:</span> a
              launchd plist shipping with operator-core is coming; today, run
              under <code>brew services</code> or <code>tmux</code>.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">Linux:</span>{" "}
              systemd user unit recommended — template in the repo.
            </li>
          </ul>
        </section>

        {/* 05 Tasks */}
        <section className="mb-12">
          <SectionHead
            n="05"
            title="Scheduled tasks"
            sub="The cron inside the daemon. One command away from anywhere."
            id="tasks"
          />
          <p className="text-sm text-[color:var(--muted)] mb-3">
            A task is a named action the scheduler fires on a cadence
            (daily, weekly, monthly). Built-in tasks cover the morning loop;
            add your own by editing{" "}
            <code className="mono">~/.operator/data/schedule.json</code> or
            via the Discord bot. Toggle any task without editing source:
          </p>
          <Code>{`operator tasks list                      # table of every task + state
operator tasks run morning-briefing      # run it now, out-of-cadence
operator tasks disable marketing-pulse   # stop cadence, keep registered
operator tasks enable marketing-pulse    # resume`}</Code>
          <p className="text-sm text-[color:var(--muted)] mt-4 mb-2">
            <span className="text-[color:var(--fg)]">Cookbook /</span> common
            recipes expressed as tasks:
          </p>
          <div className="panel bracket-corners p-4 mono text-[11px] text-[color:var(--muted)] leading-[1.7] whitespace-pre">
{`  morning-briefing   daily 06:00   cross-project status + PR queue
  pr-review          daily 06:10   auto-review open PRs, post to #code-review
  deploy-check       daily 06:20   ping every deploy URL, flag non-200
  marketing-pulse    daily 06:30   daily marketing metrics + outreach
  ag-market-pulse    monthly       PPTX deck + email to stakeholders
  cost-report        weekly 21:00  claude + infra spend breakdown`}
          </div>
        </section>

        {/* 06 CLI */}
        <section className="mb-12">
          <SectionHead
            n="06"
            title="CLI reference"
            sub="Every verb. Every flag."
            id="cli"
          />
          <Code>{`operator init                            # bootstrap ~/.operator/config.toml
operator config path                     # print config file path
operator config show                     # print parsed config + env check
operator doctor                          # validate config + env + connectivity

operator run [flags]                     # start the daemon
  --host <ip>      --port <n>
  --no-discord     --no-scheduler        --no-snapshot
  --once           --snapshot-interval <s>
  --log-level <debug|info|warn|error>    --log-file <path>

operator snapshot                        # publish one snapshot to Supabase
operator snapshot --dump                 # print the JSON payload, don't send

operator tasks list [--json]
operator tasks run    <key>
operator tasks enable <key>
operator tasks disable <key>

operator status [--once] [--json]        # terminal dashboard (Rich or ASCII)

operator version`}</Code>
        </section>

        {/* 07 Integrations */}
        <section className="mb-12">
          <SectionHead
            n="07"
            title="Integrations"
            sub="Operator talks out. Nobody calls in."
            id="integrations"
          />
          <ul className="text-sm text-[color:var(--muted)] space-y-2 mb-3">
            <li>
              • <span className="text-[color:var(--fg)]">Discord</span> —
              per-channel webhook URLs in env; posts morning briefings, PR
              reviews, deploy alerts, task results. Optional bot for slash
              commands.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">Supabase</span> —
              snapshots get POSTed to a public-read table so the{" "}
              <Link href="/kruz" className="underline hover:text-[color:var(--accent)]">
                /kruz
              </Link>{" "}
              page can render them server-side.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">Vercel</span> —
              deployment webhooks hit{" "}
              <code className="mono">/api/webhooks/vercel</code> and relay to
              your #deploys channel with HMAC verification.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">Claude Code</span>{" "}
              — hook endpoints at{" "}
              <code className="mono">http://127.0.0.1:8765/api/hooks/*</code>{" "}
              receive SessionStart / PreToolUse / PostToolUse events for
              lifecycle observability.
            </li>
          </ul>
        </section>

        {/* 08 Philosophy */}
        <section className="mb-12">
          <SectionHead
            n="08"
            title="Philosophy"
            sub="Why this exists. What it will and will not be."
            id="philosophy"
          />
          <ul className="text-sm text-[color:var(--muted)] space-y-2">
            <li>
              • <span className="text-[color:var(--fg)]">Local-first.</span>{" "}
              Your data stays on your machine. The{" "}
              <Link href="/kruz" className="underline hover:text-[color:var(--accent)]">
                /kruz
              </Link>{" "}
              broadcast is an opt-in, sanitized slice — never prompts,
              secrets, or PR URLs.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">No telemetry.</span>{" "}
              No phone-home. No analytics SDKs. You publish when you choose
              to.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">Dogfood-first.</span>{" "}
              The roadmap is what I need for my own portfolio. If it's
              useful to you, great. If it isn't, the source is yours to fork.
            </li>
            <li>
              • <span className="text-[color:var(--fg)]">
                No lock-in.
              </span>{" "}
              Config is TOML. State is sqlite + JSON. Snapshots are Postgres
              rows you own. Nothing proprietary between the daemon and your
              tools.
            </li>
          </ul>
        </section>

        <footer className="mt-12 pt-6 border-t border-[color:var(--border)] mono text-xs text-[color:var(--muted)] flex flex-wrap items-center justify-between gap-4">
          <div>DOCS // v0.1.0 // PRE-ALPHA</div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[color:var(--accent)]">
              HOME
            </Link>
            <Link href="/kruz" className="hover:text-[color:var(--accent)]">
              /KRUZ
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

import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { FeatureGrid } from "@/components/feature-grid";
import { StatusBar } from "@/components/status-bar";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <StatusBar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-20">
        {/* Hero */}
        <section className="bracket-corners relative py-16 md:py-24 px-8 md:px-12 panel mb-16">
          <div className="eyebrow mb-6">
            OPERATOR / v0.1.0 / PRE-ALPHA
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
            The AI that runs your
            <br />
            portfolio<span className="text-[color:var(--accent)]">.</span>
            <span className="cursor-blink text-[color:var(--accent)]">_</span>
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--muted)] max-w-2xl mb-10 leading-relaxed">
            A self-hosted daemon that schedules Claude agents, watches deploy
            health, handles PR factory duty, and keeps your 15 side projects
            from rotting while you build the next one.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <WaitlistForm />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 mono text-xs text-[color:var(--muted)]">
            <span>
              <span className="pip pip-ok mr-2 inline-block translate-y-[-1px]" />
              MIT LICENSED
            </span>
            <span>
              <span className="pip pip-ok mr-2 inline-block translate-y-[-1px]" />
              SELF-HOSTED
            </span>
            <span>
              <span className="pip pip-ok mr-2 inline-block translate-y-[-1px]" />
              CLAUDE-NATIVE
            </span>
            <span>
              <span className="pip pip-ok mr-2 inline-block translate-y-[-1px]" />
              MAC / LINUX / WIN
            </span>
          </div>
        </section>

        {/* Live demo link */}
        <section className="mb-16">
          <Link
            href="/kruz"
            className="group panel panel-interactive bracket-corners block p-8 md:p-10 no-underline"
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="eyebrow mb-3">
                  <span className="pip pip-ok scan-pulse mr-2 inline-block translate-y-[-1px]" />
                  LIVE / BROADCASTING
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  /kruz
                </h2>
                <p className="text-[color:var(--muted)] max-w-xl">
                  See the daemon running in production on one founder&apos;s
                  actual portfolio. Job feed, watchdog status, deploy health,
                  recent sprint report.
                </p>
              </div>
              <span className="mono text-xs text-[color:var(--accent)] self-center group-hover:translate-x-1 transition-transform">
                ENTER -&gt;
              </span>
            </div>
          </Link>
        </section>

        {/* What it does */}
        <section className="mb-20">
          <div className="eyebrow mb-4">CAPABILITIES / v0.1</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
            What the daemon does while you sleep.
          </h2>
          <FeatureGrid />
        </section>

        {/* How it works */}
        <section className="mb-20">
          <div className="eyebrow mb-4">INSTALL / 3 COMMANDS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
            Your machine. Your agents.
          </h2>
          <div className="panel bracket-corners p-8 md:p-10">
            <pre className="mono text-sm md:text-base leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[color:var(--muted)]">
                  # install and initialize
                </span>
                {"\n"}
                <span className="text-[color:var(--accent)]">$</span> pip install operator-core
                {"\n"}
                <span className="text-[color:var(--accent)]">$</span> operator init
                {"\n\n"}
                <span className="text-[color:var(--muted)]">
                  # edit ~/.operator/config.toml, add your projects
                </span>
                {"\n"}
                <span className="text-[color:var(--accent)]">$</span> operator doctor
                {"\n"}
                <span className="text-[color:var(--ok)]">
                  config path: /home/you/.operator/config.toml
                </span>
                {"\n"}
                <span className="text-[color:var(--ok)]">projects: 12</span>
                {"\n"}
                <span className="text-[color:var(--ok)]">doctor: OK</span>
                {"\n\n"}
                <span className="text-[color:var(--muted)]">
                  # start the daemon
                </span>
                {"\n"}
                <span className="text-[color:var(--accent)]">$</span> operator run
                {"\n"}
                <span className="text-[color:var(--ok)]">
                  [operator] bound 127.0.0.1:8765
                </span>
                {"\n"}
                <span className="text-[color:var(--ok)]">
                  [operator] scheduler tick: 6 tasks registered
                </span>
                {"\n"}
                <span className="text-[color:var(--ok)]">
                  [operator] discord bot online
                </span>
                <span className="cursor-blink">_</span>
              </code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 py-16 px-8 md:px-12 panel-bright bracket-corners text-center">
          <div className="eyebrow mb-4">EARLY ACCESS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Pre-alpha waitlist.
          </h2>
          <p className="text-[color:var(--muted)] mb-8 max-w-xl mx-auto">
            Not on PyPI yet. We&apos;re inviting ~10 builders from the
            waitlist per week. Early users shape the recipe library.
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm variant="inline" />
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 items-center justify-between mono text-xs text-[color:var(--muted)]">
          <div>
            OPERATOR / v0.1.0
          </div>
          <div className="flex gap-6">
            <Link
              href="https://github.com/kjhholt-alt/operator-core"
              className="hover:text-[color:var(--accent)] transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </Link>
            <Link
              href="/kruz"
              className="hover:text-[color:var(--accent)] transition-colors"
            >
              LIVE DEMO
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

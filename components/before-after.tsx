export function BeforeAfter() {
  return (
    <section className="mb-20">
      <div className="eyebrow mb-4">YOUR MORNING / BEFORE VS AFTER</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
        Swap 20 minutes of tab-hopping for one paragraph.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="panel p-6 md:p-8 h-full flex flex-col">
          <div className="eyebrow mb-4 flex items-center gap-2 text-[color:var(--muted)]">
            <span className="pip pip-idle" />
            BEFORE / WITHOUT OPERATOR
          </div>
          <h3 className="text-xl font-semibold mb-4">
            7 tabs, 20 minutes, still not sure what to do first.
          </h3>
          <ul className="mono text-xs md:text-sm text-[color:var(--muted)] space-y-2 leading-relaxed">
            <Tab>Vercel dashboard — which deploy failed last night?</Tab>
            <Tab>GitHub notifications — what PRs are open?</Tab>
            <Tab>Supabase logs — anything broken at 3am?</Tab>
            <Tab>Gmail — who needs a reply?</Tab>
            <Tab>Linear / Notion — what was I working on?</Tab>
            <Tab>Stripe — any new signups or failed charges?</Tab>
            <Tab>Discord / Slack — did anyone page me?</Tab>
          </ul>
          <p className="mt-6 mono text-[11px] text-[color:var(--muted)] italic leading-snug">
            You still have to assemble the picture yourself. Every morning.
          </p>
        </div>

        {/* AFTER */}
        <div className="panel bracket-corners p-6 md:p-8 h-full flex flex-col">
          <div className="eyebrow mb-4 flex items-center gap-2">
            <span className="pip pip-ok scan-pulse" />
            AFTER / WITH OPERATOR
          </div>
          <h3 className="text-xl font-semibold mb-4">
            One Discord message at 7am. Read it in two minutes.
          </h3>
          <div className="panel p-4 md:p-5 bg-[color:var(--surface)] border-l-2 border-[color:var(--accent)]">
            <div className="mono text-[10px] text-[color:var(--muted)] tracking-widest mb-2">
              #CLAUDE-CHAT / MORNING BRIEF
            </div>
            <p className="text-sm md:text-[15px] leading-relaxed text-[color:var(--muted)]">
              Two of seven projects moved overnight: prospector-pro shipped
              the enrichment retry, deal-brain has a PR open that&apos;s been
              sitting 4 days. Vercel is all green. Claude spend held at
              $0.34. Nothing paged — your machine is quiet.{" "}
              <span className="text-[color:var(--accent-bright)]">
                One move for today: merge the deal-brain PR so the enrichment
                work can rebase on top of it.
              </span>
            </p>
          </div>
          <p className="mt-6 mono text-[11px] text-[color:var(--muted)] italic leading-snug">
            Same daemon, your rules. The brief is one Claude call on real
            portfolio data — git log, deploy events, spend ledger.
          </p>
        </div>
      </div>
    </section>
  );
}

function Tab({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-[color:var(--muted)] flex-shrink-0">[tab]</span>
      <span>{children}</span>
    </li>
  );
}

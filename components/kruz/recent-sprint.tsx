export function RecentSprint() {
  return (
    <div className="panel bracket-corners p-8">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
        <div>
          <div className="eyebrow mb-1">RECENT SPRINT REPORT / AUTO-GENERATED</div>
          <h3 className="text-xl font-semibold">
            Sprint 0 + 1 — operator-core extract, operator-site scaffold
          </h3>
          <p className="mono text-xs text-[color:var(--muted)] mt-1">
            2026-04-16 // DRAFTED BY OPERATOR, EDITED BY HUMAN
          </p>
        </div>
        <div className="mono text-[10px] tracking-wider text-[color:var(--ok)] flex items-center gap-2">
          <span className="pip pip-ok" />
          SHIPPED
        </div>
      </div>

      <div className="mono text-sm leading-relaxed text-[color:var(--foreground)]/90 space-y-3">
        <p>
          <span className="text-[color:var(--accent)]">&gt;</span>{" "}
          Sprint 0: extracted <span className="text-[color:var(--accent-bright)]">operator-core</span>{" "}
          from the operator-scripts monolith. 31 modules ported, new TOML
          config loader, Mac/Linux/Win ready, 6 passing tests, <span className="text-[color:var(--accent-bright)]">operator init/doctor/config</span>{" "}
          CLI working end-to-end.
        </p>
        <p>
          <span className="text-[color:var(--accent)]">&gt;</span>{" "}
          Sprint 1: scaffolded <span className="text-[color:var(--accent-bright)]">operator-site</span>{" "}
          (this site). Next.js 16, tactical/Palantir aesthetic, waitlist
          form wired to Supabase, <span className="text-[color:var(--accent-bright)]">/kruz</span>{" "}
          broadcast page with watchdog / job-feed / deploy-health / roster.
        </p>
        <p>
          <span className="text-[color:var(--accent)]">&gt;</span> In flight:{" "}
          <span className="text-[color:var(--warn)]">operator run</span> (daemon entrypoint),
          live data sync for the /kruz dashboard, recipe registry v0,
          full test-suite port (210+ tests from operator-scripts).
        </p>
        <p>
          <span className="text-[color:var(--accent)]">&gt;</span> Up next:{" "}
          Vox (AI outbound calling recipe), Uncle&apos;s machine as the first
          external operator install, operator.buildkit.store live.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-[color:var(--border)] grid grid-cols-2 md:grid-cols-4 gap-6">
        <Metric label="LINES SHIPPED" value="4,112" />
        <Metric label="TESTS PASSING" value="6 / 6" />
        <Metric label="CLAUDE SPEND" value="$3.74" />
        <Metric label="HUMAN TIME" value="~3h" />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] mb-1">
        {label}
      </div>
      <div className="text-xl font-semibold mono">{value}</div>
    </div>
  );
}

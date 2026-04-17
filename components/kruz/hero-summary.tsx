import { CountUp } from "@/components/count-up";

type Props = {
  projects: number;
  jobs24h: number;
  tasksEnabled: number;
  tasksTotal: number;
  cost7dUsd: number;
};

export function HeroSummary({
  projects,
  jobs24h,
  tasksEnabled,
  tasksTotal,
  cost7dUsd,
}: Props) {
  return (
    <section className="panel bracket-corners p-6 md:p-8 mb-6">
      <div className="eyebrow mb-4 flex items-center gap-2">
        <span className="pip pip-ok scan-pulse" />
        LIVE SUMMARY / LAST 24h &amp; 7d
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <Stat
          label="PROJECTS WATCHED"
          value={
            <CountUp value={projects} className="mono" />
          }
          caption="Operator is responsible for these."
        />
        <Stat
          label="JOBS / 24h"
          value={
            <CountUp value={jobs24h} className="mono" />
          }
          caption="Agent runs completed since midnight."
        />
        <Stat
          label="TASKS ENABLED"
          value={
            <span className="mono">
              <CountUp value={tasksEnabled} />
              <span className="text-[color:var(--muted)] text-2xl">
                /{tasksTotal}
              </span>
            </span>
          }
          caption="Scheduled rituals wired to the daemon."
        />
        <Stat
          label="CLAUDE SPEND / 7d"
          value={
            <CountUp
              value={cost7dUsd}
              decimals={2}
              prefix="$"
              className="mono"
            />
          }
          caption="What the daemon costs you to run."
        />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  caption,
}: {
  label: string;
  value: React.ReactNode;
  caption: string;
}) {
  return (
    <div>
      <div className="mono text-[10px] tracking-wider text-[color:var(--muted)] mb-2">
        {label}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-[color:var(--accent-bright)] tabular-nums">
        {value}
      </div>
      <div className="mono text-[11px] text-[color:var(--muted)] italic mt-2 leading-snug">
        {caption}
      </div>
    </div>
  );
}

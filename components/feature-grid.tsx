import {
  Bot,
  Activity,
  MessageSquare,
  Shield,
  GitPullRequest,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    id: "001",
    name: "Scheduled Agents",
    desc: "Recipes fire on cron. Claude agents run in worktrees, open PRs, tear themselves down. You review the diffs, not the process.",
  },
  {
    icon: Activity,
    id: "002",
    name: "Watchdog",
    desc: "Every status section has a max-age. When a job hasn't run in N hours, Operator pings Discord before you notice something stalled.",
  },
  {
    icon: MessageSquare,
    id: "003",
    name: "Discord Surface",
    desc: "!op status, !op morning, !op review prs, !op deploy check. Slash commands too. Your whole portfolio ops from one channel.",
  },
  {
    icon: Shield,
    id: "004",
    name: "Claude Code Hooks",
    desc: "Pre/post tool-use guardrails, risk tiering, auto-merge gating. Protected paths never merge without explicit approval.",
  },
  {
    icon: GitPullRequest,
    id: "005",
    name: "PR Factory",
    desc: "Worktree per task. Agent works in isolation, runs your test suite, opens a PR. Green CI auto-merges if you opted in.",
  },
  {
    icon: LineChart,
    id: "006",
    name: "Observability",
    desc: "Local /ops dashboard, Prometheus /metrics endpoint, job ledger in sqlite. Everything the daemon does is inspectable.",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.id}
            className="panel panel-interactive p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 border border-[color:var(--border-bright)] flex items-center justify-center group-hover:border-[color:var(--accent)] transition-colors">
                <Icon className="h-5 w-5 text-[color:var(--accent)]" />
              </div>
              <span className="mono text-[10px] text-[color:var(--muted)] tracking-wider">
                MOD.{f.id}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.name}</h3>
            <p className="text-sm text-[color:var(--muted)] leading-relaxed">
              {f.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

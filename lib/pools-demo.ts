// Static data for /demo/pools — a fictional fiberglass pool installer
// ("Lakeside Fiberglass") so a real pool operator can see themselves
// in Operator without installing anything. All names are invented.

export type LeadRow = {
  temp: "hot" | "warm" | "cold";
  name: string;
  source: string;
  reason: string;
};

export type HealthRow = {
  state: "ok" | "warn" | "alert";
  household: string;
  last_touch: string; // "23 days ago"
  reason: string;
};

export type ChecklistItem = {
  due: string; // "in 2 days" / "this week"
  title: string;
  detail: string;
};

export const POOL_HERO = {
  projects: 1,
  jobs24h: 14,
  tasksEnabled: 5,
  tasksTotal: 5,
  cost7dUsd: 2.47,
};

export const POOL_LEADS: LeadRow[] = [
  {
    temp: "hot",
    name: "The Andersons",
    source: "Website form // 32 min ago",
    reason:
      "Ready to break ground this spring, matched your 14x28 model, lives 6 min from your yard.",
  },
  {
    temp: "hot",
    name: "Rivera family",
    source: "Referral from a 2022 install",
    reason:
      "Neighbor of the Rivera installs you did last June, mentioned the same color package.",
  },
  {
    temp: "warm",
    name: "Jason K.",
    source: "Facebook ad // 4 hours ago",
    reason:
      "Asking about salt cells + automation. Match to Tier-B quote you sent two comparable leads last week.",
  },
  {
    temp: "warm",
    name: "The Mitchells",
    source: "Website form // yesterday",
    reason:
      "First-time pool, price-shopping. Needs the walk-through deck; not urgent but worth a follow-up call.",
  },
  {
    temp: "cold",
    name: "Brad O.",
    source: "Google Maps review reply",
    reason:
      "Commented on a competitor review. Not an inbound lead, but close geographically. Flag for a postcard drop.",
  },
  {
    temp: "cold",
    name: "The Wilsons",
    source: "Website form // 6 days ago",
    reason:
      "Went dark after the quote landed. Auto-followup drafted, waiting on your approval to send.",
  },
];

export const POOL_HEALTH: HealthRow[] = [
  {
    state: "ok",
    household: "The Carters // Bettendorf",
    last_touch: "12 days ago",
    reason: "On cadence. Salt cell check-in auto-scheduled for week 16.",
  },
  {
    state: "ok",
    household: "The Nguyens // Moline",
    last_touch: "28 days ago",
    reason: "Year-3 referral window opens next month; campaign queued.",
  },
  {
    state: "ok",
    household: "The Parker family",
    last_touch: "41 days ago",
    reason: "Opening completed, seasonal reminder in 3 weeks.",
  },
  {
    state: "warn",
    household: "The Lees // Davenport",
    last_touch: "74 days ago",
    reason:
      "Outside 60-day window. Drafted a spring opening nudge — waiting on your go.",
  },
  {
    state: "warn",
    household: "The Harringtons",
    last_touch: "88 days ago",
    reason:
      "Invoice from winterization never paid. Soft nudge drafted + flagged for call.",
  },
  {
    state: "alert",
    household: "The Kovaks // Rock Island",
    last_touch: "132 days ago",
    reason:
      "Past churn threshold. No referral, no review, no re-engagement. Owner-call escalation.",
  },
  {
    state: "alert",
    household: "The Davisons",
    last_touch: "147 days ago",
    reason:
      "Three missed seasonal checkpoints. Competitor spotted on-site per neighborhood chatter.",
  },
  {
    state: "alert",
    household: "The Ortiz install",
    last_touch: "168 days ago",
    reason:
      "Longest untouched active customer. Needs a personal owner outreach.",
  },
];

export const POOL_CHECKLIST: ChecklistItem[] = [
  {
    due: "in 2 days",
    title: "Salt cell check-ins // 2021 cohort",
    detail:
      "11 households due for the 4-year cell assessment. Draft emails ready; you approve in one screen.",
  },
  {
    due: "in 5 days",
    title: "Spring opening wave // A-list",
    detail:
      "14 customers ready for first-opening service. Schedule auto-slotted, crew roster pre-assigned.",
  },
  {
    due: "this week",
    title: "Winter cover review // expired group",
    detail:
      "7 households on expired covers. Reorder reminder + photo request queued.",
  },
  {
    due: "next week",
    title: "Referral window opens // year-2 installs",
    detail:
      "9 households hit the 24-month mark; the referral campaign will auto-send on the 15th unless you pause it.",
  },
  {
    due: "in 3 weeks",
    title: "Cement pad permit renewals",
    detail:
      "5 municipal permits expiring for new builds in Q3. Paperwork pre-filled, waiting on your signature.",
  },
];

export const POOL_WEEKLY_BRIEF = `This week moved 3 hot leads into pricing, all within 10 miles of the yard — closest since April. The Kovaks install is past 130 days untouched and the neighborhood chatter says a competitor was on their driveway Saturday; that's the one phone call to make Monday. Two referral windows (Nguyen, Parker) open in the next 21 days and neither has had a touch since install, so queue those before April 28. Claude spend last 7 days: $2.47 — 91 cents of it was the weekly brief and lead-scoring. Everything else held its cadence. One move for today: call the Kovaks yourself, in your voice, before 11am.`;

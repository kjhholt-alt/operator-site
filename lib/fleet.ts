// Fleet dashboard data loader.
//
// Reads a single normalized Supabase view `fleet_metrics_v` (created by the
// Sprint A Task 4 migration in ArmyofClaws). Returns one row per product
// with 7d / 30d counts + last-reply-at + revenue + status flags.
//
// Gracefully returns `null` if the view is unreachable (missing env, RLS
// block, or not-yet-applied migration) so the page can render a banner
// instead of crashing.

import { createClient } from "@supabase/supabase-js";

export type FleetRow = {
  product_key: string;
  display_name: string;
  accent_hex: string;
  deploy_url: string;
  sends_7d: number;
  sends_30d: number;
  opens_7d: number;
  opens_30d: number;
  replies_7d: number;
  replies_30d: number;
  meetings_7d: number;
  meetings_30d: number;
  revenue_monthly_usd: number;
  last_send_at: string | null;
  last_reply_at: string | null;
  subs_active: number;
  bounced_total: number;
};

export async function fetchFleetMetrics(): Promise<FleetRow[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from("fleet_metrics_v")
    .select(
      "product_key, display_name, accent_hex, deploy_url, " +
        "sends_7d, sends_30d, opens_7d, opens_30d, " +
        "replies_7d, replies_30d, meetings_7d, meetings_30d, " +
        "revenue_monthly_usd, last_send_at, last_reply_at, " +
        "subs_active, bounced_total",
    );
  if (error || !data) {
    return null;
  }
  // Supabase returns numerics as strings for decimal columns — cast them
  // cleanly so the page can sum / compare without guarding each read.
  return (data as unknown as FleetRow[]).map((r) => ({
    ...r,
    sends_7d: Number(r.sends_7d ?? 0),
    sends_30d: Number(r.sends_30d ?? 0),
    opens_7d: Number(r.opens_7d ?? 0),
    opens_30d: Number(r.opens_30d ?? 0),
    replies_7d: Number(r.replies_7d ?? 0),
    replies_30d: Number(r.replies_30d ?? 0),
    meetings_7d: Number(r.meetings_7d ?? 0),
    meetings_30d: Number(r.meetings_30d ?? 0),
    revenue_monthly_usd: Number(r.revenue_monthly_usd ?? 0),
    subs_active: Number(r.subs_active ?? 0),
    bounced_total: Number(r.bounced_total ?? 0),
  }));
}

/**
 * Freshness verdict for a product row. Used to colour the status pip.
 *  - ok:    last send within the last 48h AND bounce rate < 10%
 *  - warn:  older than 48h OR bounce rate >= 10%
 *  - alert: no sends in the last 14 days
 *  - idle:  never sent
 */
export type FreshnessState = "ok" | "warn" | "alert" | "idle";

export function freshnessState(row: FleetRow): FreshnessState {
  if (!row.last_send_at) return "idle";
  const last = new Date(row.last_send_at).getTime();
  const now = Date.now();
  const hoursAgo = (now - last) / 3_600_000;
  const totalSends = row.sends_30d;
  const bounceRate = totalSends > 0 ? row.bounced_total / totalSends : 0;
  if (hoursAgo > 24 * 14) return "alert";
  if (hoursAgo > 48 || bounceRate >= 0.1) return "warn";
  return "ok";
}

/**
 * Nurture-health badge — mirrors the audit script's 3-color verdict.
 *  - ok:    at least some replies (so the product is converting)
 *  - warn:  sending but no replies in 30d
 *  - alert: 30d bounce rate >= 10%
 *  - idle:  no sends yet
 */
export function nurtureState(row: FleetRow): FreshnessState {
  if (row.sends_30d === 0) return "idle";
  const bounceRate = row.bounced_total / row.sends_30d;
  if (bounceRate >= 0.1) return "alert";
  if (row.replies_30d > 0) return "ok";
  return "warn";
}

export function formatRelative(ts: string | null): string {
  if (!ts) return "-";
  const then = new Date(ts).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const sec = Math.round(diffMs / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  if (sec < 60) return `${sec}s ago`;
  if (min < 60) return `${min}m ago`;
  if (hr < 48) return `${hr}h ago`;
  return `${day}d ago`;
}

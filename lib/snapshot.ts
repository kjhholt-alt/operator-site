/**
 * Types + loader for the Operator snapshot published by
 * `operator_core.snapshot` into Supabase.
 *
 * We read with the PUBLIC Supabase URL (anon safe) because the
 * `operator_snapshots` table has a public-read RLS policy — these
 * snapshots are sanitized for the public /kruz dashboard.
 */

import { createClient } from "@supabase/supabase-js";

export type WatchdogSection = {
  name: string;
  ok: boolean;
  age: string;
  max_hours: number;
};

export type SnapshotJob = {
  id: string;
  action: string;
  project: string | null;
  status: string;
  cost: string;
  when: string;
};

export type SnapshotDeploy = {
  project: string;
  status: "ok" | "warn" | "alert" | "idle";
  host: string;
  latency?: string;
};

export type SnapshotPortfolioEntry = {
  slug: string;
  tier: string;
  auto_merge: boolean;
};

export type SnapshotPayload = {
  generated_at: string;
  summary: {
    projects: number;
    tracked_sections: number;
    jobs_24h: number;
    cost_24h_usd: number;
  };
  watchdog: WatchdogSection[];
  jobs: SnapshotJob[];
  deploy_health: SnapshotDeploy[];
  portfolio: SnapshotPortfolioEntry[];
  daemon: {
    pid: number | null;
    started_at: string | null;
    uptime_sec: number;
  };
};

export type SnapshotRow = {
  published_at: string;
  payload: SnapshotPayload;
};

export async function fetchLatestSnapshot(
  node = "kruz",
): Promise<SnapshotRow | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon) {
    return null;
  }

  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client
    .from("operator_snapshots")
    .select("published_at, payload")
    .eq("node", node)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn("[snapshot] fetch error:", error.message);
    return null;
  }
  return (data as SnapshotRow | null) ?? null;
}

export function snapshotAgeMinutes(publishedAt: string): number {
  const published = new Date(publishedAt).getTime();
  if (isNaN(published)) return Number.POSITIVE_INFINITY;
  return (Date.now() - published) / 60_000;
}

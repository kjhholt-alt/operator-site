// Reply ledger loader for /ops/replies.
//
// Source of truth is the operator-core SQLite reply store on the
// daemon machine. The daemon exposes a slice of it in the snapshot
// (summary + last 3 threads). For the full inbox we optionally
// read a mirrored Supabase table `outreach_reply_threads` — if the
// table doesn't exist, the page gracefully falls back to the
// snapshot slice.

import { createClient } from "@supabase/supabase-js";
import type { ReplyStatus } from "@/lib/snapshot";

export type ReplyThreadRow = {
  thread_id: string;
  sender_email: string;
  sender_name: string | null;
  subject: string;
  status: ReplyStatus;
  first_received_at: string;
  last_activity_at: string;
  dd_notes_md: string;
};

export async function fetchReplyThreads(): Promise<ReplyThreadRow[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from("outreach_reply_threads")
    .select(
      "thread_id, sender_email, sender_name, subject, status, " +
        "first_received_at, last_activity_at, dd_notes_md",
    )
    .order("last_activity_at", { ascending: false })
    .limit(50);
  if (error) {
    return null;
  }
  return ((data as unknown) as ReplyThreadRow[]) ?? [];
}

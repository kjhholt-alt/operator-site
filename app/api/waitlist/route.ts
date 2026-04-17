import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  // Gracefully handle env-not-configured so the page still works in preview.
  // In dev without Supabase, still return ok so the UX is testable.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    console.warn("[waitlist] Supabase not configured — email not persisted");
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const supabase = serverClient();
    const referrer = req.headers.get("referer") ?? null;
    const ua = req.headers.get("user-agent") ?? null;

    const { error } = await supabase.from("operator_waitlist").insert({
      email,
      referrer,
      user_agent: ua,
    });

    // Duplicate email is fine — the user is already on the list.
    if (error && error.code !== "23505") {
      console.error("[waitlist] insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save. Try again in a moment." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e) {
    console.error("[waitlist] unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { postDiscord, DISCORD_COLORS } from "@/lib/discord";

export const runtime = "nodejs";

/**
 * Vercel project webhook → #deploys channel.
 *
 * Wire in Vercel: Project Settings → Webhooks → add
 * https://operator-site-three.vercel.app/api/webhooks/vercel
 * with events: deployment.created, deployment.succeeded, deployment.error,
 * deployment.canceled, deployment.promoted.
 *
 * Vercel signs each payload with HMAC-SHA1 using the webhook secret,
 * delivered as the `x-vercel-signature` header. We verify when
 * VERCEL_WEBHOOK_SECRET is set; otherwise we accept (preview / testing).
 */

type VercelEvent = {
  id?: string;
  type?: string;
  createdAt?: number;
  payload?: {
    deployment?: {
      id?: string;
      url?: string;
      name?: string;
      target?: string;
      source?: string;
      inspectorUrl?: string;
      meta?: Record<string, string>;
    };
    project?: { id?: string; name?: string };
    user?: { username?: string };
    links?: { deployment?: string; project?: string };
  };
};

function verifySignature(raw: string, signature: string | null): boolean {
  const secret = process.env.VERCEL_WEBHOOK_SECRET;
  if (!secret) {
    // No secret configured → skip verification (preview / local).
    console.warn("[vercel-webhook] VERCEL_WEBHOOK_SECRET not set, skipping verification");
    return true;
  }
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha1", secret)
    .update(raw)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(signature, "utf8"),
    );
  } catch {
    return false;
  }
}

function colorForEvent(type: string | undefined): number {
  if (!type) return DISCORD_COLORS.accent;
  if (type.endsWith(".succeeded") || type.endsWith(".promoted")) return DISCORD_COLORS.ok;
  if (type.endsWith(".error")) return DISCORD_COLORS.alert;
  if (type.endsWith(".canceled")) return DISCORD_COLORS.warn;
  return DISCORD_COLORS.accent;
}

function titleForEvent(type: string | undefined, projectName: string | undefined): string {
  const action = (type ?? "deployment.event").replace("deployment.", "").toUpperCase();
  const prefix = "DEPLOY";
  const proj = projectName ? ` / ${projectName.toUpperCase()}` : "";
  return `${prefix}${proj} / ${action}`;
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-vercel-signature");

  if (!verifySignature(raw, signature)) {
    console.warn("[vercel-webhook] signature mismatch");
    return NextResponse.json({ ok: false, error: "bad signature" }, { status: 401 });
  }

  let event: VercelEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  // Only forward deployment events. Project / user events are noise.
  const type = event.type ?? "";
  if (!type.startsWith("deployment.")) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const d = event.payload?.deployment;
  const p = event.payload?.project;
  const url = d?.url ? `https://${d.url}` : undefined;
  const inspector = d?.inspectorUrl ?? event.payload?.links?.deployment;
  const commitMsg = d?.meta?.githubCommitMessage ?? d?.meta?.gitlabCommitMessage;
  const commitSha = d?.meta?.githubCommitSha ?? d?.meta?.gitlabCommitSha;
  const branch = d?.meta?.githubCommitRef ?? d?.meta?.gitlabCommitRef;
  const author = d?.meta?.githubCommitAuthorName ?? event.payload?.user?.username;

  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];
  if (d?.target) fields.push({ name: "target", value: d.target, inline: true });
  if (branch)    fields.push({ name: "branch", value: `\`${branch}\``, inline: true });
  if (commitSha) fields.push({ name: "commit", value: `\`${String(commitSha).slice(0, 7)}\``, inline: true });
  if (author)    fields.push({ name: "by",     value: String(author), inline: true });
  if (commitMsg) fields.push({ name: "message", value: String(commitMsg).slice(0, 200) });
  if (url)       fields.push({ name: "url",     value: url });
  if (inspector) fields.push({ name: "inspect", value: inspector });

  await postDiscord("DISCORD_DEPLOYS_WEBHOOK_URL", {
    embeds: [
      {
        title: titleForEvent(type, p?.name),
        color: colorForEvent(type),
        fields,
        footer: { text: "vercel -> operator" },
        timestamp: new Date().toISOString(),
      },
    ],
  });

  return NextResponse.json({ ok: true });
}

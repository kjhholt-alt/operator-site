/**
 * Thin Discord webhook client. Fire-and-forget — never fails the caller.
 * Reads webhook URL from env. Returns true on success, false on any failure
 * (network, 4xx, 5xx, misconfig). Callers should not await or act on the
 * boolean; it's there for observability in tests.
 */

type Embed = {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string };
  timestamp?: string;
};

export async function postDiscord(
  webhookEnvVar: string,
  payload: { content?: string; embeds?: Embed[]; username?: string },
): Promise<boolean> {
  const url = process.env[webhookEnvVar];
  if (!url) {
    // Silently no-op if the webhook isn't configured for this env (e.g. preview).
    return false;
  }
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: payload.username ?? "Operator",
        content: payload.content,
        embeds: payload.embeds,
      }),
    });
    return r.ok;
  } catch (e) {
    console.warn("[discord] post failed:", e);
    return false;
  }
}

// Colors matching the tactical palette on the site.
export const DISCORD_COLORS = {
  ok: 0x7cc49b,
  warn: 0xd4a14a,
  alert: 0xe57373,
  accent: 0x5a9bff,
} as const;

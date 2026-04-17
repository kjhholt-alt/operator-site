"use client";

import { useState } from "react";

type Variant = "default" | "inline";

export function WaitlistForm({ variant = "default" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setMessage("");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!r.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Request failed. Try again.");
        return;
      }
      setStatus("success");
      setMessage("On the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  const inline = variant === "inline";

  return (
    <form
      onSubmit={onSubmit}
      className={
        inline
          ? "flex flex-col sm:flex-row gap-2 w-full"
          : "flex flex-col sm:flex-row gap-2 w-full max-w-lg"
      }
    >
      <input
        type="email"
        required
        placeholder="you@domain.com"
        className="input-tactical flex-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting" || status === "success"}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="btn-primary whitespace-nowrap"
        disabled={status === "submitting" || status === "success"}
      >
        {status === "submitting"
          ? "..."
          : status === "success"
            ? "JOINED"
            : "REQUEST ACCESS"}
      </button>
      {message && (
        <div
          className={`mono text-xs mt-2 basis-full ${
            status === "error"
              ? "text-[color:var(--alert)]"
              : "text-[color:var(--ok)]"
          }`}
        >
          {status === "error" ? "> ERR: " : "> "}
          {message}
        </div>
      )}
    </form>
  );
}

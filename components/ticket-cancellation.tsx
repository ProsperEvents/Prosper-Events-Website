"use client";

import { useState } from "react";

export function TicketCancellation({ sessionId }: { sessionId: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function cancel() {
    setLoading(true);
    const response = await fetch("/api/tickets/cancel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) });
    const body = await response.json();
    setMessage(body.message || body.error || "We could not cancel this ticket.");
    setLoading(false);
  }
  return <div className="mt-8"><button type="button" disabled={loading || Boolean(message)} onClick={cancel} className="rounded-full bg-navy px-6 py-3 text-sm text-white disabled:opacity-60">{loading ? "Cancelling…" : "Cancel ticket"}</button>{message ? <p className="mt-4 text-sm leading-7 text-navy/72">{message}</p> : null}</div>;
}

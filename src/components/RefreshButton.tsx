"use client";

import { useState } from "react";

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRefresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/refresh", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Refresh failed");
      }
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleRefresh}
        disabled={loading}
        className="font-[family-name:var(--font-dm-sans)] text-sm px-6 py-2.5 bg-ink text-paper tracking-wider uppercase hover:bg-ink-light transition-colors disabled:opacity-50"
      >
        {loading ? "Generating Today’s Edition…" : "Generate Today’s Edition"}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-700 font-[family-name:var(--font-dm-sans)]">
          {error}
        </p>
      )}
      {loading && (
        <p className="mt-3 text-xs text-ink-muted font-[family-name:var(--font-dm-sans)]">
          Fetching news and reframing articles — this takes about 30 seconds.
        </p>
      )}
    </div>
  );
}

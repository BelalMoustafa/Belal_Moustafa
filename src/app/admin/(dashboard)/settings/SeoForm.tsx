"use client";

import { useState } from "react";
import type { SeoSettings } from "@/lib/settings";

export function SeoForm({ initial }: { initial: SeoSettings }) {
  const [value, setValue] = useState(JSON.stringify(initial, null, 2));
  const [status, setStatus] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      const parsed = JSON.parse(value);
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "seo", value: parsed }),
      });
      setStatus(res.ok ? "Saved" : "Failed");
    } catch {
      setStatus("Invalid JSON");
    }
  }

  return (
    <form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-6">
      <textarea
        rows={24}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
      />
      <button
        type="submit"
        className="mt-4 rounded-lg bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Save SEO JSON
      </button>
      {status ? <p className="mt-2 text-sm text-slate-500">{status}</p> : null}
    </form>
  );
}

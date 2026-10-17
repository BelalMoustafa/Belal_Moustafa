"use client";

import { useState } from "react";
import type { ProfileSettings } from "@/lib/settings";

export function ProfileForm({ initial }: { initial: ProfileSettings }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "profile", value: form }),
    });
    setStatus(res.ok ? "Saved" : "Failed");
  }

  async function upload(file: File) {
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const json = await res.json();
    if (json.url) setForm((f) => ({ ...f, photo: json.url }));
  }

  const fields: (keyof ProfileSettings)[] = [
    "nameEn",
    "nameAr",
    "titleEn",
    "titleAr",
    "availabilityEn",
    "availabilityAr",
    "summaryEn",
    "summaryAr",
    "email",
    "phone",
    "phoneDisplay",
    "whatsapp",
    "linkedin",
    "github",
    "companyUrl",
    "photo",
    "cvFullstack",
    "cvFrontend",
    "locationEn",
    "locationAr",
  ];

  return (
    <form onSubmit={save} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Upload new profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      </label>
      {fields.map((key) => (
        <label key={key} className="block text-sm">
          <span className="mb-1.5 block font-medium">{key}</span>
          {key.includes("summary") || key.includes("availability") ? (
            <textarea
              rows={3}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          ) : (
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="rounded-lg bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Save profile
      </button>
      {status ? <p className="text-sm text-slate-500">{status}</p> : null}
    </form>
  );
}

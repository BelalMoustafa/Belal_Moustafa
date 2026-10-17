"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectData = {
  id?: string;
  slug?: string;
  titleEn?: string;
  titleAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  challengeEn?: string;
  challengeAr?: string;
  solutionEn?: string;
  solutionAr?: string;
  roleEn?: string;
  roleAr?: string;
  categoryEn?: string;
  categoryAr?: string;
  techStack?: string;
  featuresEn?: string;
  featuresAr?: string;
  liveUrl?: string | null;
  track?: string;
  sortOrder?: number;
  published?: boolean;
};

export function ProjectEditor({ project }: { project?: ProjectData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: project?.slug || "",
    titleEn: project?.titleEn || "",
    titleAr: project?.titleAr || "",
    summaryEn: project?.summaryEn || "",
    summaryAr: project?.summaryAr || "",
    challengeEn: project?.challengeEn || "",
    challengeAr: project?.challengeAr || "",
    solutionEn: project?.solutionEn || "",
    solutionAr: project?.solutionAr || "",
    roleEn: project?.roleEn || "",
    roleAr: project?.roleAr || "",
    categoryEn: project?.categoryEn || "",
    categoryAr: project?.categoryAr || "",
    techStack: project?.techStack || "[]",
    featuresEn: project?.featuresEn || "[]",
    featuresAr: project?.featuresAr || "[]",
    liveUrl: project?.liveUrl || "",
    track: project?.track || "both",
    sortOrder: project?.sortOrder ?? 0,
    published: project?.published ?? true,
  });
  const [status, setStatus] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch(
      project?.id ? `/api/admin/projects/${project.id}` : "/api/admin/projects",
      {
        method: project?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    if (!res.ok) {
      setStatus("Failed");
      return;
    }
    setStatus("Saved");
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
      {(
        Object.keys(form) as (keyof typeof form)[]
      ).map((key) => (
        <label key={key} className="block text-sm">
          <span className="mb-1 block font-medium">{key}</span>
          {typeof form[key] === "boolean" ? (
            <input
              type="checkbox"
              checked={form[key] as boolean}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
            />
          ) : (
            <textarea
              rows={key.includes("summary") || key.includes("challenge") || key.includes("solution") || key.includes("role") ? 3 : 1}
              value={String(form[key])}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]:
                    key === "sortOrder" ? Number(e.target.value) : e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="rounded-lg bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white"
      >
        Save
      </button>
      {status ? <p className="text-sm text-slate-500">{status}</p> : null}
    </form>
  );
}

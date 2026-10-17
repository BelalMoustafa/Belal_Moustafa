"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Printer } from "lucide-react";
import { parseJsonArray } from "@/lib/utils";

type Experience = {
  id: string;
  companyEn: string;
  companyAr: string;
  roleEn: string;
  roleAr: string;
  startLabel: string;
  endLabel: string;
  bulletsEn: string;
  bulletsAr: string;
  track: string;
};

type Project = {
  id: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  roleEn: string;
  roleAr: string;
  track: string;
};

type Honor = {
  id: string;
  titleEn: string;
  titleAr: string;
  orgEn: string;
  orgAr: string;
  detailEn: string;
  detailAr: string;
  kind: string;
};

type Profile = {
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  email: string;
  phoneDisplay: string;
  linkedin: string;
  github: string;
  cvFullstack: string;
  cvFrontend: string;
  summaryEn: string;
  summaryAr: string;
};

export function ResumeView({
  isAr,
  profile,
  experiences,
  projects,
  honors,
  skillsByCategory,
}: {
  isAr: boolean;
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  honors: Honor[];
  skillsByCategory: Record<string, string[]>;
}) {
  const t = useTranslations("resume");
  const [track, setTrack] = useState<"fullstack" | "frontend">("fullstack");

  const filteredExp = useMemo(
    () =>
      experiences.filter(
        (e) => e.track === "both" || e.track === track || (track === "fullstack" && e.track === "fullstack"),
      ),
    [experiences, track],
  );

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.track === "both" || p.track === track),
    [projects, track],
  );

  const title =
    track === "fullstack"
      ? "Full-Stack Software Engineer / Technical Lead"
      : "Frontend Software Engineer / Technical Lead";

  return (
    <div>
      <div className="no-print mb-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setTrack("fullstack")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            track === "fullstack"
              ? "border-[#0066FF] bg-[#0066FF] text-white"
              : "border-bm-border bg-bm-card text-bm-muted"
          }`}
        >
          {t("fullstack")}
        </button>
        <button
          type="button"
          onClick={() => setTrack("frontend")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            track === "frontend"
              ? "border-[#0066FF] bg-[#0066FF] text-white"
              : "border-bm-border bg-bm-card text-bm-muted"
          }`}
        >
          {t("frontend")}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-bm-border bg-bm-card px-4 py-2 text-sm font-semibold text-bm-fg"
        >
          <Printer className="h-4 w-4" />
          {t("print")}
        </button>
        <a
          href={track === "fullstack" ? profile.cvFullstack : profile.cvFrontend}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-bm-border bg-bm-card px-4 py-2 text-sm font-semibold text-bm-fg"
        >
          {t("openHtml")}
        </a>
      </div>

      <article className="print-resume mx-auto max-w-[210mm] rounded-2xl border border-bm-border bg-white p-8 text-slate-900 shadow-sm md:p-12 dark:bg-bm-card dark:text-bm-fg">
        <header className="border-b-2 border-slate-900 pb-4 text-center dark:border-bm-border">
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? profile.nameAr : profile.nameEn}
          </h1>
          <p className="mt-1 text-base font-medium text-slate-700 dark:text-bm-muted">
            {title}
          </p>
          <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-bm-muted">
            <span>{isAr ? profile.locationAr : profile.locationEn}</span>
            <a href={`tel:${profile.phoneDisplay.replace(/\s/g, "")}`} dir="ltr">
              {profile.phoneDisplay}
            </a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </header>

        <section className="mt-6">
          <h2 className="border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-wider dark:border-bm-border">
            Professional Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-bm-muted">
            {isAr ? profile.summaryAr : profile.summaryEn}
          </p>
        </section>

        <section className="mt-6">
          <h2 className="border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-wider dark:border-bm-border">
            Skills
          </h2>
          <div className="mt-2 space-y-1 text-sm">
            {Object.entries(skillsByCategory).map(([cat, names]) => (
              <p key={cat}>
                <strong className="capitalize">{cat}:</strong> {names.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-wider dark:border-bm-border">
            Work Experience
          </h2>
          <div className="mt-3 space-y-4">
            {filteredExp.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {isAr ? exp.companyAr : exp.companyEn} —{" "}
                    {isAr ? exp.roleAr : exp.roleEn}
                  </p>
                  <p className="text-xs font-medium text-slate-600 dark:text-bm-muted">
                    {exp.startLabel} – {exp.endLabel}
                  </p>
                </div>
                <ul className="mt-1 list-disc space-y-1 ps-5 text-sm text-slate-700 dark:text-bm-muted">
                  {parseJsonArray(isAr ? exp.bulletsAr : exp.bulletsEn).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-wider dark:border-bm-border">
            Key Projects
          </h2>
          <div className="mt-3 space-y-3">
            {filteredProjects.map((p) => (
              <div key={p.id}>
                <p className="text-sm font-semibold">
                  {isAr ? p.titleAr : p.titleEn}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-bm-muted">
                  {isAr ? p.roleAr || p.summaryAr : p.roleEn || p.summaryEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-wider dark:border-bm-border">
            Education & Honors
          </h2>
          <div className="mt-3 space-y-2">
            {honors.map((h) => (
              <div key={h.id}>
                <p className="text-sm font-semibold">
                  {isAr ? h.titleAr : h.titleEn}
                </p>
                <p className="text-sm text-slate-700 dark:text-bm-muted">
                  {isAr ? h.orgAr : h.orgEn}
                  {h.detailEn ? ` — ${isAr ? h.detailAr : h.detailEn}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

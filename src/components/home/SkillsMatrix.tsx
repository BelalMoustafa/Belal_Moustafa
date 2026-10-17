"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Skill = { id: string; name: string; category: string };

const CATEGORIES = ["all", "languages", "frontend", "backend", "databases", "devops"] as const;

export function SkillsMatrix({ skills }: { skills: Skill[] }) {
  const t = useTranslations("skills");
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("all");

  const filtered = useMemo(
    () => (active === "all" ? skills : skills.filter((s) => s.category === active)),
    [skills, active],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              active === key
                ? "border-[#0066FF] bg-[#0066FF] text-white"
                : "border-bm-border bg-bm-card text-bm-muted hover:text-bm-fg"
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="rounded-xl border border-bm-border bg-bm-card px-4 py-3 text-sm font-medium text-bm-fg"
          >
            <span className="font-mono text-xs text-bm-blue">{skill.category}</span>
            <p className="mt-1">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

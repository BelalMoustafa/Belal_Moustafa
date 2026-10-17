import { prisma } from "@/lib/prisma";

export const metadata = { title: "Skills" };

export default async function SkillsAdminPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <h1 className="text-2xl font-bold">Skills</h1>
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {s.category}
            </p>
            <p className="mt-1 font-medium">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

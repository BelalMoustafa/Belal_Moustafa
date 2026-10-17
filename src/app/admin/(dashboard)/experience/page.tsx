import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";

export const metadata = { title: "Experience" };

export default async function ExperienceAdminPage() {
  const items = await prisma.experience.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold">Experience</h1>
      <p className="mt-1 text-sm text-slate-500">
        Seeded career timeline. Edit via Prisma Studio or re-seed for bulk updates.
      </p>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-semibold">
              {item.roleEn} @ {item.companyEn}
            </p>
            <p className="text-xs text-slate-500">
              {item.startLabel} – {item.endLabel} · track: {item.track}
            </p>
            <ul className="mt-2 list-disc ps-5 text-sm text-slate-600">
              {parseJsonArray(item.bulletsEn).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

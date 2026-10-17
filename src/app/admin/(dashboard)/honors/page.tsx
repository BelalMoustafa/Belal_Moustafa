import { prisma } from "@/lib/prisma";

export const metadata = { title: "Honors" };

export default async function HonorsAdminPage() {
  const honors = await prisma.honor.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold">Education, Honors & Certifications</h1>
      <div className="mt-6 space-y-3">
        {honors.map((h) => (
          <article key={h.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0066FF]">
              {h.kind}
            </p>
            <p className="mt-1 font-semibold">{h.titleEn}</p>
            <p className="text-sm text-slate-500">{h.orgEn}</p>
            <p className="mt-1 text-sm text-slate-600">{h.detailEn}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

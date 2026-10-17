import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-[#0066FF] px-3 py-2 text-sm font-semibold text-white"
        >
          New project
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold">{p.titleEn}</p>
              <p className="text-xs text-slate-500">/{p.slug}</p>
            </div>
            <Link
              href={`/admin/projects/${p.id}`}
              className="text-sm font-semibold text-[#0066FF]"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

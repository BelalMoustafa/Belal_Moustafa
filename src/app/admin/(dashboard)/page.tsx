import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const [projects, messages, experiences, skills] = await Promise.all([
    prisma.project.count(),
    prisma.message.count({ where: { status: "New" } }),
    prisma.experience.count(),
    prisma.skill.count(),
  ]);

  const cards = [
    { label: "Projects", value: projects },
    { label: "New messages", value: messages },
    { label: "Experience entries", value: experiences },
    { label: "Skills", value: skills },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage Belal Moustafa personal portfolio content.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {c.label}
            </p>
            <p className="mt-2 font-mono text-3xl font-bold text-[#0066FF]">
              {c.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

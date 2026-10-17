import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin, destroySession } from "@/lib/auth";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/honors", label: "Honors" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "SEO Settings" },
];

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-slate-200 bg-white md:border-b-0 md:border-e">
        <div className="px-5 py-5">
          <p className="text-sm font-bold">Belal CMS</p>
          <p className="mt-1 text-xs text-slate-500">{admin.email}</p>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:flex-col md:overflow-visible">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <form action={logoutAction} className="px-1 pt-2">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-start text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </form>
        </nav>
      </aside>
      <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

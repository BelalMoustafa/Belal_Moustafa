import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { alternates } from "@/lib/seo";
import { getSetting, type SeoSettings } from "@/lib/settings";
import type { AppLocale } from "@/i18n/routing";
import { Section, SectionHeader } from "@/components/ui/Section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const seo = await getSetting<SeoSettings>("seo", {});
  const page = seo.projects;
  const isAr = locale === "ar";
  return {
    title: isAr ? page?.titleAr : page?.titleEn,
    description: isAr ? page?.descriptionAr : page?.descriptionEn,
    alternates: alternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const isAr = locale === "ar";
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <Section>
      <SectionHeader as="h1" badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border border-bm-border bg-bm-card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-bm-blue">
              {isAr ? project.categoryAr : project.categoryEn}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-bm-fg">
              {isAr ? project.titleAr : project.titleEn}
            </h2>
            <p className="mt-2 text-sm text-bm-muted">
              {isAr ? project.summaryAr : project.summaryEn}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {parseJsonArray(project.techStack).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-bm-border bg-bm-canvas px-2 py-0.5 font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bm-blue"
            >
              {t("viewCase")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

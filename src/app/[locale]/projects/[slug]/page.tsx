import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { alternates } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  const isAr = locale === "ar";
  return {
    title: isAr
      ? project.seoTitleAr || project.titleAr
      : project.seoTitleEn || project.titleEn,
    description: isAr
      ? project.seoDescAr || project.summaryAr
      : project.seoDescEn || project.summaryEn,
    alternates: alternates(locale as AppLocale, `/projects/${slug}`),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const isAr = locale === "ar";
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project || !project.published) notFound();

  const title = isAr ? project.titleAr : project.titleEn;
  const features = parseJsonArray(isAr ? project.featuresAr : project.featuresEn);
  const tech = parseJsonArray(project.techStack);

  return (
    <>
      <Section className="!pb-8">
        <Link href="/projects" className="text-sm font-medium text-bm-muted hover:text-bm-fg">
          ← Projects
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-bm-blue">
          {isAr ? project.categoryAr : project.categoryEn}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-bold tracking-tight text-bm-fg md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-bm-muted">
          {isAr ? project.summaryAr : project.summaryEn}
        </p>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white"
          >
            {t("live")}
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </Section>
      <Section tone="canvas">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-bm-border bg-bm-card p-6">
            <h2 className="text-lg font-semibold text-bm-fg">{t("challenge")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-bm-muted">
              {isAr ? project.challengeAr : project.challengeEn}
            </p>
          </div>
          <div className="rounded-2xl border border-bm-border bg-bm-card p-6">
            <h2 className="text-lg font-semibold text-bm-fg">{t("solution")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-bm-muted">
              {isAr ? project.solutionAr : project.solutionEn}
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-bm-border bg-bm-card p-6">
          <h2 className="text-lg font-semibold text-bm-fg">{t("role")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-bm-muted">
            {isAr ? project.roleAr : project.roleEn}
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-bm-fg">{t("features")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm text-bm-muted">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-bm-fg">{t("stack")}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-bm-border bg-bm-canvas px-3 py-1.5 font-mono text-xs font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

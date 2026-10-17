import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { alternates } from "@/lib/seo";
import { getSetting, type ProfileSettings, type SeoSettings } from "@/lib/settings";
import type { AppLocale } from "@/i18n/routing";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SkillsMatrix } from "@/components/home/SkillsMatrix";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const seo = await getSetting<SeoSettings>("seo", {});
  const page = seo.home;
  const isAr = locale === "ar";
  return {
    title: isAr ? page?.titleAr : page?.titleEn,
    description: isAr ? page?.descriptionAr : page?.descriptionEn,
    alternates: alternates(locale, "/"),
    openGraph: {
      title: isAr ? page?.titleAr : page?.titleEn,
      description: isAr ? page?.descriptionAr : page?.descriptionEn,
      images: ["/uploads/profile/belal-moustafa.png"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const isAr = locale === "ar";

  const profile = await getSetting<ProfileSettings>("profile", {
    nameEn: "Belal Moustafa",
    nameAr: "بلال مصطفى",
    titleEn: "Technical Lead & Full-Stack / Frontend Software Engineer",
    titleAr: "قائد تقني ومهندس برمجيات متكامل",
    locationEn: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    email: "belalmoustafa65@gmail.com",
    phone: "+201157167417",
    phoneDisplay: "+20 115 716 7417",
    whatsapp: "201157167417",
    linkedin: "https://www.linkedin.com/in/belal-moustafa30/",
    github: "https://github.com/BelalMoustafa",
    companyUrl: "https://tarqumi.com",
    photo: "/uploads/profile/belal-moustafa.png",
    availabilityEn:
      "Available for Technical Leadership, Consulting & High-Impact Projects",
    availabilityAr: "متاح للقيادة التقنية والاستشارات والمشاريع عالية الأثر",
    summaryEn: "",
    summaryAr: "",
    cvFullstack: "/cv/belal-moustafa-cv-fullstack.html",
    cvFrontend: "/cv/belal-moustafa-cv.html",
  });

  const [metrics, skills, projects, experiences, honors] = await Promise.all([
    prisma.metric.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.skill.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.project.findMany({
      where: { published: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.experience.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.honor.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-bm-border">
        <div className="bm-grid-bg absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8">
          <div className="bm-animate-fade-up lg:col-span-7">
            <p className="mb-4 inline-flex rounded-full border border-bm-border bg-bm-canvas px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-bm-blue">
              {isAr ? profile.availabilityAr : profile.availabilityEn}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-bm-fg sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {isAr ? profile.nameAr : profile.nameEn}
            </h1>
            <p className="mt-3 text-lg font-medium text-bm-blue md:text-xl">
              {isAr ? profile.titleAr : profile.titleEn}
            </p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-bm-muted md:text-lg">
              {isAr ? profile.summaryAr : profile.summaryEn}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-bm-muted">
              <MapPin className="h-4 w-4" />
              {isAr ? profile.locationAr : profile.locationEn}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0066FF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#075CFF]"
              >
                {t("hero.ctaContact")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-bm-border bg-bm-card px-5 py-3 text-sm font-semibold text-bm-fg"
              >
                {t("hero.ctaProjects")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={profile.cvFullstack}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-bm-border bg-bm-card px-5 py-3 text-sm font-semibold text-bm-fg"
              >
                <Download className="h-4 w-4" />
                {t("hero.ctaCv")}
              </a>
            </div>
          </div>
          <div className="bm-animate-fade-up lg:col-span-5">
            <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl border border-bm-border bg-bm-canvas p-2 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={profile.photo}
                  alt={isAr ? profile.nameAr : profile.nameEn}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, 380px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="canvas" className="!py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-bm-border bg-bm-card px-4 py-5 text-center"
            >
              <p className="font-mono text-2xl font-bold text-bm-blue md:text-3xl">
                {m.value}
              </p>
              <p className="mt-1 text-xs font-medium text-bm-muted md:text-sm">
                {isAr ? m.labelAr : m.labelEn}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          badge={t("skills.badge")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />
        <SkillsMatrix skills={skills} />
      </Section>

      <Section tone="canvas">
        <SectionHeader
          badge={t("projects.badge")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-bm-border bg-bm-card p-6 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-bm-blue">
                {isAr ? project.categoryAr : project.categoryEn}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-bm-fg">
                {isAr ? project.titleAr : project.titleEn}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bm-muted">
                {isAr ? project.summaryAr : project.summaryEn}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {parseJsonArray(project.techStack).slice(0, 5).map((tech) => (
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
                {t("projects.viewCase")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="text-sm font-semibold text-bm-blue">
            {t("projects.viewAll")}
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeader
          badge={t("experience.badge")}
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="rounded-2xl border border-bm-border bg-bm-card p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-bm-fg">
                  {isAr ? exp.roleAr : exp.roleEn}
                </h3>
                <p className="font-mono text-xs text-bm-muted">
                  {exp.startLabel} – {exp.endLabel}
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-bm-blue">
                {isAr ? exp.companyAr : exp.companyEn}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-bm-muted">
                {parseJsonArray(isAr ? exp.bulletsAr : exp.bulletsEn).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="canvas">
        <SectionHeader
          badge={t("education.badge")}
          title={t("education.title")}
          subtitle={t("education.subtitle")}
        />
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {honors.map((h) => (
            <article
              key={h.id}
              className="rounded-2xl border border-bm-border bg-bm-card p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-bm-blue">
                {h.kind}
              </p>
              <h3 className="mt-2 text-base font-semibold text-bm-fg">
                {isAr ? h.titleAr : h.titleEn}
              </h3>
              <p className="mt-1 text-sm text-bm-muted">
                {isAr ? h.orgAr : h.orgEn}
              </p>
              <p className="mt-2 text-sm text-bm-muted">
                {isAr ? h.detailAr : h.detailEn}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="!py-16">
        <div className="rounded-2xl border border-bm-border bg-[#0066FF] px-6 py-10 text-center text-white md:px-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100 md:text-base">
            {t("contact.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0066FF]"
          >
            {t("hero.ctaContact")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </Section>
    </>
  );
}

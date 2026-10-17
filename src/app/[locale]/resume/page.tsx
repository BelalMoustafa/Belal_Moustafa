import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { alternates } from "@/lib/seo";
import { getSetting, type ProfileSettings, type SeoSettings } from "@/lib/settings";
import type { AppLocale } from "@/i18n/routing";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ResumeView } from "@/components/resume/ResumeView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const seo = await getSetting<SeoSettings>("seo", {});
  const page = seo.resume;
  const isAr = locale === "ar";
  return {
    title: isAr ? page?.titleAr : page?.titleEn,
    description: isAr ? page?.descriptionAr : page?.descriptionEn,
    alternates: alternates(locale, "/resume"),
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const isAr = locale === "ar";

  const profile = await getSetting<ProfileSettings>("profile", {
    nameEn: "Belal Moustafa",
    nameAr: "بلال مصطفى",
    titleEn: "",
    titleAr: "",
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
    availabilityEn: "",
    availabilityAr: "",
    summaryEn: "",
    summaryAr: "",
    cvFullstack: "/cv/belal-moustafa-cv-fullstack.html",
    cvFrontend: "/cv/belal-moustafa-cv.html",
  });

  const [experiences, projects, honors, skills] = await Promise.all([
    prisma.experience.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.honor.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.skill.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const skillsByCategory: Record<string, string[]> = {};
  for (const s of skills) {
    skillsByCategory[s.category] = skillsByCategory[s.category] || [];
    skillsByCategory[s.category].push(s.name);
  }

  return (
    <Section>
      <div className="no-print">
        <SectionHeader as="h1" badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      </div>
      <ResumeView
        isAr={isAr}
        profile={profile}
        experiences={experiences}
        projects={projects}
        honors={honors}
        skillsByCategory={skillsByCategory}
      />
    </Section>
  );
}

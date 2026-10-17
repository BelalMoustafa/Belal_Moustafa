import { siteUrl } from "./utils";
import type { AppLocale } from "@/i18n/routing";

export function localizedPath(locale: AppLocale, path = "") {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === "en") return clean || "/";
  return clean ? `/ar${clean}` : "/ar";
}

export function alternates(locale: AppLocale, path = "") {
  const en = siteUrl(localizedPath("en", path));
  const ar = siteUrl(localizedPath("ar", path));
  return {
    canonical: locale === "ar" ? ar : en,
    languages: { en, ar, "x-default": en },
  };
}

export function personJsonLd(profile: {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  email: string;
  phone: string;
  photo: string;
  linkedin: string;
  github: string;
  companyUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl()}/#person`,
        name: profile.nameEn,
        alternateName: [profile.nameAr, "Belal Mustafa"],
        jobTitle: profile.titleEn,
        url: siteUrl(),
        image: siteUrl(profile.photo),
        email: profile.email,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        worksFor: {
          "@type": "Organization",
          name: "Tarqumi",
          url: profile.companyUrl || "https://tarqumi.com",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "October Technological University",
          },
          {
            "@type": "EducationalOrganization",
            name: "WE Applied Technology School",
          },
        ],
        award:
          "2nd Place Nationwide in Software — Egypt Science and Engineering Fair (ESIF)",
        sameAs: [profile.linkedin, profile.github, profile.companyUrl],
        knowsAbout: [
          "Next.js",
          "NestJS",
          "Laravel",
          "Flutter",
          "TypeScript",
          "PostgreSQL",
          "Docker",
          "SaaS Architecture",
          "React",
          "Prisma",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl()}/#profilepage`,
        url: siteUrl(),
        name: `${profile.nameEn} — Technical Lead & Full-Stack Software Engineer`,
        mainEntity: { "@id": `${siteUrl()}/#person` },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: AppLocale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(localizedPath(locale, item.path)),
    })),
  };
}

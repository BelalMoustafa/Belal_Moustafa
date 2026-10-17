import { prisma } from "./prisma";

export type ProfileSettings = {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  companyUrl: string;
  photo: string;
  availabilityEn: string;
  availabilityAr: string;
  summaryEn: string;
  summaryAr: string;
  summaryFullstackEn: string;
  summaryFullstackAr: string;
  summaryFrontendEn: string;
  summaryFrontendAr: string;
  summaryBackendEn: string;
  summaryBackendAr: string;
  cvFullstack: string;
  cvFrontend: string;
  cvBackend: string;
};

export type SeoPage = {
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

export type SeoSettings = {
  home?: SeoPage;
  projects?: SeoPage;
  resume?: SeoPage;
  contact?: SeoPage;
};

export const defaultProfile: ProfileSettings = {
  nameEn: "Belal Moustafa",
  nameAr: "بلال مصطفى",
  titleEn: "Technical Lead & Full-Stack / Frontend Software Engineer",
  titleAr: "قائد تقني ومهندس برمجيات متكامل / واجهات",
  locationEn: "Cairo, Egypt",
  locationAr: "القاهرة، مصر",
  email: "belalmoustafa65@gmail.com",
  phone: "+201157167417",
  phoneDisplay: "+20 115 716 7417",
  whatsapp: "201157167417",
  linkedin: "https://www.linkedin.com/in/belal-moustafa30/",
  github: "https://github.com/BelalMoustafa",
  companyUrl: "https://tarqumi.com",
  photo: "/uploads/profile/belal-moustafa.jpg",
  availabilityEn:
    "Available for Technical Leadership, Consulting & High-Impact Projects",
  availabilityAr: "متاح للقيادة التقنية والاستشارات والمشاريع عالية الأثر",
  summaryEn: "",
  summaryAr: "",
  summaryFullstackEn: "",
  summaryFullstackAr: "",
  summaryFrontendEn: "",
  summaryFrontendAr: "",
  summaryBackendEn: "",
  summaryBackendAr: "",
  cvFullstack: "/cv/belal-moustafa-fullstack.pdf",
  cvFrontend: "/cv/belal-moustafa-frontend.pdf",
  cvBackend: "/cv/belal-moustafa-backend.pdf",
};

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  try {
    return { ...fallback, ...(JSON.parse(row.value) as object) } as T;
  } catch {
    return fallback;
  }
}

export async function setSetting(key: string, value: unknown) {
  const payload = JSON.stringify(value);
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: payload },
    create: { key, value: payload },
  });
}

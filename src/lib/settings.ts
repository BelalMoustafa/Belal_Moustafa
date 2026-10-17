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
  cvFullstack: string;
  cvFrontend: string;
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

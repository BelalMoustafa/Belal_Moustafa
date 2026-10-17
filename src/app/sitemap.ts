import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const staticPaths = ["", "/projects", "/resume", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const enUrl = `${base}${path || "/"}`;
    const arUrl = `${base}/ar${path}`;
    const languages = { en: enUrl, ar: arUrl, "x-default": enUrl };
    entries.push(
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      },
      {
        url: arUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 0.95 : 0.75,
        alternates: { languages },
      },
    );
  }

  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  for (const project of projects) {
    const enUrl = `${base}/projects/${project.slug}`;
    const arUrl = `${base}/ar/projects/${project.slug}`;
    const languages = { en: enUrl, ar: arUrl, "x-default": enUrl };
    entries.push(
      {
        url: enUrl,
        lastModified: project.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      },
      {
        url: arUrl,
        lastModified: project.updatedAt,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages },
      },
    );
  }

  return entries;
}

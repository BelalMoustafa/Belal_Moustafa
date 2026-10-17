import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultProfile, getSetting } from "@/lib/settings";
import { siteUrl } from "@/lib/utils";

export async function GET() {
  const profile = await getSetting("profile", defaultProfile);

  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  const text = `# Belal Moustafa

> Official personal site: ${siteUrl()}
> Arabic: ${siteUrl("/ar")}

## Identity
- Name: Belal Moustafa / بلال مصطفى
- Role: ${profile.titleEn}
- Location: Cairo, Egypt
- Email: ${profile.email}
- Phone / WhatsApp: ${profile.phoneDisplay}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- Company: Tarqumi for Digital Solutions (${profile.companyUrl})

## Summary
${profile.summaryEn}

## Impact Metrics
- 3+ years experience
- 55+ production projects
- 15+ engineers led
- 10,000+ concurrent users supported

## Flagship Projects
${projects
  .map(
    (p) =>
      `- ${p.titleEn} (${siteUrl(`/projects/${p.slug}`)}): ${p.summaryEn}`,
  )
  .join("\n")}

## Award
- 2nd Place Nationwide in Software — Egypt Science and Engineering Fair (ESIF)

## Education
- B.Sc. Information Technology (CS Major) — October Technological University (2024–Expected 2028)
- Diploma in Web Development & Programming — WE Applied Technology School (2021–2024)
`;

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

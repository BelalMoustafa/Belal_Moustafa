import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const project = await prisma.project.update({
    where: { id },
    data: {
      slug: body.slug,
      titleEn: body.titleEn,
      titleAr: body.titleAr,
      summaryEn: body.summaryEn,
      summaryAr: body.summaryAr,
      challengeEn: body.challengeEn || "",
      challengeAr: body.challengeAr || "",
      solutionEn: body.solutionEn || "",
      solutionAr: body.solutionAr || "",
      roleEn: body.roleEn || "",
      roleAr: body.roleAr || "",
      categoryEn: body.categoryEn || "",
      categoryAr: body.categoryAr || "",
      techStack: body.techStack || "[]",
      featuresEn: body.featuresEn || "[]",
      featuresAr: body.featuresAr || "[]",
      liveUrl: body.liveUrl || null,
      track: body.track || "both",
      sortOrder: Number(body.sortOrder) || 0,
      published: Boolean(body.published),
    },
  });
  return NextResponse.json(project);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

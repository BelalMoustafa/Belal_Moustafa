import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { setSetting } from "@/lib/settings";

export async function PUT(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body?.key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  await setSetting(body.key, body.value);
  return NextResponse.json({ ok: true });
}

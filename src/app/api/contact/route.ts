import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        subject: body.subject || null,
        message: body.message,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

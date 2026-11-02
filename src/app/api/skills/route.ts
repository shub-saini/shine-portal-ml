import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { DEMO_SKILLS } from "@/lib/db/demo-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Try database query with graceful fallback to demo skills
    try {
      const dbSkills = await prisma.skill.findMany({
        where: category ? { category } : undefined,
        orderBy: { name: "asc" },
      });
      if (dbSkills.length > 0) {
        return NextResponse.json({ skills: dbSkills });
      }
    } catch (dbErr) {
      // Database not yet migrated/available; fallback to demo data
    }

    const filtered = category
      ? DEMO_SKILLS.filter((s) => s.category.toLowerCase() === category.toLowerCase())
      : DEMO_SKILLS;

    return NextResponse.json({ skills: filtered });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch skills", details: message }, { status: 500 });
  }
}

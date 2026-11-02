import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server-auth";
import { DEMO_JOBS } from "@/lib/db/demo-data";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    return NextResponse.json({
      recommendations: [
        {
          job: DEMO_JOBS[0],
          compatibilityScore: 92,
          matchedSkills: ["TypeScript", "React", "PostgreSQL"],
          missingSkills: ["Docker (Intermediate)"],
          rationale: "Matches 3 of 4 required competencies with high academic standing.",
        },
        {
          job: DEMO_JOBS[1],
          compatibilityScore: 84,
          matchedSkills: ["PostgreSQL", "Python"],
          missingSkills: ["System Design (Intermediate)"],
          rationale: "Matches core backend stack. Recommended elective in System Design.",
        },
      ],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

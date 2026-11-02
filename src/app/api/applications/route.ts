import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireRole } from "@/lib/auth/server-auth";
import { UserRole, ApplicationStatus } from "@prisma/client";
import { DEMO_APPLICATIONS } from "@/lib/db/demo-data";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      applications: DEMO_APPLICATIONS,
      total: DEMO_APPLICATIONS.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole([UserRole.STUDENT]);
    const body = await req.json();
    const { jobId, coverNote } = body;

    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      application: {
        id: `app_sub_${Date.now()}`,
        studentId: user.studentProfileId || "demo_student",
        jobId,
        coverNote,
        status: ApplicationStatus.SUBMITTED,
        appliedAt: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Forbidden";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}

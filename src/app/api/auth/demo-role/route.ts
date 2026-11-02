import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { ROLE_DEFAULT_ROUTES } from "@/lib/authorization/permissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const role = body.role as UserRole;

    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      role,
      redirectUrl: ROLE_DEFAULT_ROUTES[role],
    });

    // Store in cookie for session persistence across server components
    response.cookies.set("shine_demo_role", role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Failed to switch role" }, { status: 500 });
  }
}

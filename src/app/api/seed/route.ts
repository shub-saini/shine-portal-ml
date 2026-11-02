import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    // Check if database is accessible
    const userCount = await prisma.user.count();
    return NextResponse.json({
      success: true,
      databaseConnected: true,
      userCount,
      message: "Database connection verified. Use `bun run db:seed` in terminal to execute full seeding.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({
      success: false,
      databaseConnected: false,
      message: "PostgreSQL database not yet connected or migrations pending.",
      details: message,
    });
  }
}

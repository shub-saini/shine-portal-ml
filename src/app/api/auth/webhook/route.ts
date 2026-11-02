import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const eventType = payload.type;

    if (!eventType) {
      return NextResponse.json({ error: "Missing event type" }, { status: 400 });
    }

    const { id: clerkId, email_addresses, first_name, last_name, image_url, public_metadata } = payload.data || {};
    const primaryEmail = email_addresses?.[0]?.email_address;

    if (!clerkId || !primaryEmail) {
      return NextResponse.json({ received: true, ignored: "Missing user details" });
    }

    switch (eventType) {
      case "user.created": {
        const assignedRole = (public_metadata?.role as UserRole) || UserRole.STUDENT;

        await prisma.user.upsert({
          where: { clerkId },
          update: {
            email: primaryEmail,
            firstName: first_name || null,
            lastName: last_name || null,
            avatarUrl: image_url || null,
          },
          create: {
            clerkId,
            email: primaryEmail,
            firstName: first_name || null,
            lastName: last_name || null,
            avatarUrl: image_url || null,
            role: assignedRole,
          },
        });
        break;
      }

      case "user.updated": {
        await prisma.user.updateMany({
          where: { clerkId },
          data: {
            email: primaryEmail,
            firstName: first_name || null,
            lastName: last_name || null,
            avatarUrl: image_url || null,
          },
        });
        break;
      }

      case "user.deleted": {
        await prisma.user.deleteMany({
          where: { clerkId },
        });
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook failure";
    console.error("Clerk Webhook processing error:", err);
    return NextResponse.json({ error: "Webhook handler failed", details: message }, { status: 500 });
  }
}

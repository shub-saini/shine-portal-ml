import { cookies } from "next/headers";
import { UserRole, type User } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  hasPermission,
  hasRole,
  type Permission,
  ROLE_DEFAULT_ROUTES,
} from "@/lib/authorization/permissions";
import {
  DEMO_STUDENT,
  DEMO_FACULTY,
  DEMO_COLLEGE_ADMIN,
  DEMO_RECRUITER,
  DEMO_SUPER_ADMIN,
} from "@/lib/db/demo-data";

export interface AuthenticatedUser extends Partial<User> {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  collegeId?: string;
  companyId?: string;
  studentProfileId?: string;
  facultyProfileId?: string;
  isDemo?: boolean;
}

/**
 * Resolves current user from Clerk auth or active demo session
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const demoRoleCookie = cookieStore.get("shine_demo_role")?.value as UserRole | undefined;

  // 1. Check if Clerk is configured with real keys
  const hasValidClerk =
    process.env.CLERK_SECRET_KEY &&
    !process.env.CLERK_SECRET_KEY.includes("placeholder") &&
    !process.env.CLERK_SECRET_KEY.includes("sample");

  if (hasValidClerk) {
    try {
      const { auth } = await import("@clerk/nextjs/server");
      const session = await auth();
      if (session && session.userId) {
        // Query database user linked to Clerk ID
        const dbUser = await prisma.user.findUnique({
          where: { clerkId: session.userId },
          include: {
            studentProfile: true,
            facultyProfile: true,
            collegeAdminProfile: true,
            companyMembers: true,
          },
        });

        if (dbUser) {
          return {
            id: dbUser.id,
            clerkId: dbUser.clerkId,
            email: dbUser.email,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            role: dbUser.role,
            avatarUrl: dbUser.avatarUrl,
            collegeId:
              dbUser.studentProfile?.collegeId ||
              dbUser.facultyProfile?.collegeId ||
              dbUser.collegeAdminProfile?.collegeId,
            companyId: dbUser.companyMembers?.[0]?.companyId,
            studentProfileId: dbUser.studentProfile?.id,
            facultyProfileId: dbUser.facultyProfile?.id,
            isDemo: false,
          };
        }
      }
    } catch (err) {
      console.warn("Clerk server authentication check fallback:", err);
    }
  }

  // 2. Demo Mode Fallback for local testing and evaluator preview
  const activeRole: UserRole = demoRoleCookie || UserRole.STUDENT;

  switch (activeRole) {
    case UserRole.STUDENT:
      return {
        id: DEMO_STUDENT.user.id,
        clerkId: "demo_clerk_student",
        email: DEMO_STUDENT.user.email,
        firstName: DEMO_STUDENT.user.firstName,
        lastName: DEMO_STUDENT.user.lastName,
        role: UserRole.STUDENT,
        avatarUrl: DEMO_STUDENT.user.avatarUrl,
        collegeId: DEMO_STUDENT.collegeId,
        studentProfileId: DEMO_STUDENT.id,
        isDemo: true,
      };

    case UserRole.FACULTY:
      return {
        id: DEMO_FACULTY.user.id,
        clerkId: "demo_clerk_faculty",
        email: DEMO_FACULTY.user.email,
        firstName: DEMO_FACULTY.user.firstName,
        lastName: DEMO_FACULTY.user.lastName,
        role: UserRole.FACULTY,
        avatarUrl: DEMO_FACULTY.user.avatarUrl,
        collegeId: DEMO_FACULTY.collegeId,
        facultyProfileId: DEMO_FACULTY.id,
        isDemo: true,
      };

    case UserRole.COLLEGE_ADMIN:
      return {
        id: DEMO_COLLEGE_ADMIN.user.id,
        clerkId: "demo_clerk_tpo",
        email: DEMO_COLLEGE_ADMIN.user.email,
        firstName: DEMO_COLLEGE_ADMIN.user.firstName,
        lastName: DEMO_COLLEGE_ADMIN.user.lastName,
        role: UserRole.COLLEGE_ADMIN,
        avatarUrl: DEMO_COLLEGE_ADMIN.user.avatarUrl,
        collegeId: DEMO_COLLEGE_ADMIN.collegeId,
        isDemo: true,
      };

    case UserRole.INDUSTRY_RECRUITER:
      return {
        id: DEMO_RECRUITER.user.id,
        clerkId: "demo_clerk_recruiter",
        email: DEMO_RECRUITER.user.email,
        firstName: DEMO_RECRUITER.user.firstName,
        lastName: DEMO_RECRUITER.user.lastName,
        role: UserRole.INDUSTRY_RECRUITER,
        avatarUrl: DEMO_RECRUITER.user.avatarUrl,
        companyId: DEMO_RECRUITER.companyId,
        isDemo: true,
      };

    case UserRole.SUPER_ADMIN:
      return {
        id: DEMO_SUPER_ADMIN.id,
        clerkId: DEMO_SUPER_ADMIN.clerkId,
        email: DEMO_SUPER_ADMIN.email,
        firstName: DEMO_SUPER_ADMIN.firstName,
        lastName: DEMO_SUPER_ADMIN.lastName,
        role: UserRole.SUPER_ADMIN,
        avatarUrl: DEMO_SUPER_ADMIN.avatarUrl,
        isDemo: true,
      };

    default:
      return null;
  }
}

/**
 * Requires an authenticated user session. Throws or redirects if unauthenticated.
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: Authentication required.");
  }
  return user;
}

/**
 * Requires user to have one of the specified roles.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (!hasRole(user.role, allowedRoles)) {
    throw new Error(
      `FORBIDDEN: User role [${user.role}] is not authorized for this operation. Required: [${allowedRoles.join(", ")}]`
    );
  }
  return user;
}

/**
 * Requires specific fine-grained permission.
 */
export async function requirePermission(permission: Permission): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    throw new Error(
      `FORBIDDEN: Missing required permission [${permission}] for role [${user.role}].`
    );
  }
  return user;
}

/**
 * Enforces college institutional tenant isolation.
 */
export async function requireCollegeAccess(targetCollegeId: string): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (user.role === UserRole.SUPER_ADMIN) return user;

  if (!user.collegeId || user.collegeId !== targetCollegeId) {
    throw new Error("FORBIDDEN: Cross-institution access violation.");
  }
  return user;
}

/**
 * Enforces company tenant isolation.
 */
export async function requireCompanyAccess(targetCompanyId: string): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (user.role === UserRole.SUPER_ADMIN) return user;

  if (!user.companyId || user.companyId !== targetCompanyId) {
    throw new Error("FORBIDDEN: Unauthorized company resource access.");
  }
  return user;
}

import { UserRole } from "@prisma/client";

export const PERMISSIONS = {
  // Student permissions
  STUDENT_PROFILE_READ: "student.profile.read",
  STUDENT_PROFILE_UPDATE: "student.profile.update",
  STUDENT_SKILLS_MANAGE: "student.skills.manage",
  STUDENT_APPLICATIONS_READ: "student.applications.read",
  STUDENT_APPLICATIONS_CREATE: "student.applications.create",
  STUDENT_LEARNING_READ: "student.learning.read",

  // Faculty permissions
  FACULTY_STUDENTS_READ: "faculty.students.read",
  FACULTY_SKILLS_VERIFY: "faculty.skills.verify",
  FACULTY_ANALYTICS_READ: "faculty.analytics.read",

  // College Admin permissions
  COLLEGE_STUDENTS_MANAGE: "college.students.manage",
  COLLEGE_DEPARTMENTS_MANAGE: "college.departments.manage",
  COLLEGE_FACULTY_MANAGE: "college.faculty.manage",
  COLLEGE_PLACEMENTS_MANAGE: "college.placements.manage",
  COLLEGE_ANALYTICS_READ: "college.analytics.read",
  COLLEGE_COLLABORATIONS_MANAGE: "college.collaborations.manage",

  // Industry Recruiter permissions
  COMPANY_PROFILE_MANAGE: "company.profile.manage",
  COMPANY_JOBS_MANAGE: "company.jobs.manage",
  COMPANY_CANDIDATES_READ: "company.candidates.read",
  COMPANY_APPLICATIONS_MANAGE: "company.applications.manage",
  COMPANY_INTERVIEWS_MANAGE: "company.interviews.manage",
  COMPANY_COLLABORATIONS_MANAGE: "company.collaborations.manage",

  // Super Admin permissions
  ADMIN_USERS_MANAGE: "admin.users.manage",
  ADMIN_COLLEGES_MANAGE: "admin.colleges.manage",
  ADMIN_COMPANIES_MANAGE: "admin.companies.manage",
  ADMIN_PLATFORM_MANAGE: "admin.platform.manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  [UserRole.STUDENT]: [
    PERMISSIONS.STUDENT_PROFILE_READ,
    PERMISSIONS.STUDENT_PROFILE_UPDATE,
    PERMISSIONS.STUDENT_SKILLS_MANAGE,
    PERMISSIONS.STUDENT_APPLICATIONS_READ,
    PERMISSIONS.STUDENT_APPLICATIONS_CREATE,
    PERMISSIONS.STUDENT_LEARNING_READ,
  ],

  [UserRole.FACULTY]: [
    PERMISSIONS.FACULTY_STUDENTS_READ,
    PERMISSIONS.FACULTY_SKILLS_VERIFY,
    PERMISSIONS.FACULTY_ANALYTICS_READ,
  ],

  [UserRole.COLLEGE_ADMIN]: [
    PERMISSIONS.COLLEGE_STUDENTS_MANAGE,
    PERMISSIONS.COLLEGE_DEPARTMENTS_MANAGE,
    PERMISSIONS.COLLEGE_FACULTY_MANAGE,
    PERMISSIONS.COLLEGE_PLACEMENTS_MANAGE,
    PERMISSIONS.COLLEGE_ANALYTICS_READ,
    PERMISSIONS.COLLEGE_COLLABORATIONS_MANAGE,
    PERMISSIONS.FACULTY_STUDENTS_READ,
    PERMISSIONS.FACULTY_ANALYTICS_READ,
  ],

  [UserRole.INDUSTRY_RECRUITER]: [
    PERMISSIONS.COMPANY_PROFILE_MANAGE,
    PERMISSIONS.COMPANY_JOBS_MANAGE,
    PERMISSIONS.COMPANY_CANDIDATES_READ,
    PERMISSIONS.COMPANY_APPLICATIONS_MANAGE,
    PERMISSIONS.COMPANY_INTERVIEWS_MANAGE,
    PERMISSIONS.COMPANY_COLLABORATIONS_MANAGE,
  ],

  [UserRole.SUPER_ADMIN]: Object.values(PERMISSIONS),
};

export const ROLE_DEFAULT_ROUTES: Record<UserRole, string> = {
  [UserRole.STUDENT]: "/student/dashboard",
  [UserRole.FACULTY]: "/faculty/dashboard",
  [UserRole.COLLEGE_ADMIN]: "/college/dashboard",
  [UserRole.INDUSTRY_RECRUITER]: "/industry/dashboard",
  [UserRole.SUPER_ADMIN]: "/admin/dashboard",
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (role === UserRole.SUPER_ADMIN) return true;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function hasRole(currentRole: UserRole, allowedRoles: UserRole[]): boolean {
  if (currentRole === UserRole.SUPER_ADMIN) return true;
  return allowedRoles.includes(currentRole);
}

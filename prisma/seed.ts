import { PrismaClient, UserRole, UserStatus, SkillLevel, VerificationStatus, JobType, JobStatus, ApplicationStatus, CollaborationStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed for Academia–Industry Connect...");

  // 1. Create College
  const college = await prisma.college.upsert({
    where: { code: "AIST" },
    update: {},
    create: {
      name: "Apex Institute of Science & Technology",
      code: "AIST",
      slug: "apex-institute",
      website: "https://aist.edu.in",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      isVerified: true,
      verifiedAt: new Date(),
    },
  });

  // 2. Create Departments
  const cseDept = await prisma.department.upsert({
    where: { collegeId_code: { collegeId: college.id, code: "CSE" } },
    update: {},
    create: {
      name: "Computer Science & Engineering",
      code: "CSE",
      collegeId: college.id,
    },
  });

  const eceDept = await prisma.department.upsert({
    where: { collegeId_code: { collegeId: college.id, code: "ECE" } },
    update: {},
    create: {
      name: "Electronics & Communication Engineering",
      code: "ECE",
      collegeId: college.id,
    },
  });

  // 3. Create Skills
  const skillsData = [
    { name: "TypeScript", category: "Programming", description: "Typed JavaScript for scalable web development" },
    { name: "React", category: "Framework", description: "Component-based UI library" },
    { name: "Next.js", category: "Framework", description: "Full-stack React framework with SSR & App Router" },
    { name: "Python", category: "Programming", description: "Multi-paradigm language for AI, data, and web" },
    { name: "PostgreSQL", category: "Database", description: "Advanced open-source relational database" },
    { name: "Docker", category: "Cloud/DevOps", description: "Containerization and microservice deployment" },
    { name: "System Design", category: "Domain", description: "Scalable architecture and distributed patterns" },
    { name: "Technical Communication", category: "Soft Skill", description: "Cross-functional articulation and documentation" },
    { name: "Machine Learning", category: "Domain", description: "Statistical modeling, scikit-learn, PyTorch" },
    { name: "FastAPI", category: "Framework", description: "High-performance Python API framework" },
  ];

  const skillRecords = [];
  for (const skill of skillsData) {
    const s = await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
    skillRecords.push(s);
  }

  // 4. Create Placement Officer / College Admin
  const tpoUser = await prisma.user.upsert({
    where: { email: "vikram.malhotra@aist.edu.in" },
    update: {},
    create: {
      clerkId: "clerk_tpo_vikram_demo",
      email: "vikram.malhotra@aist.edu.in",
      firstName: "Prof. Vikram",
      lastName: "Malhotra",
      role: UserRole.COLLEGE_ADMIN,
      status: UserStatus.ACTIVE,
      collegeAdminProfile: {
        create: {
          collegeId: college.id,
          title: "Dean of Industry Relations & Head TPO",
          officePhone: "+91 80 2345 6789",
        },
      },
    },
  });

  // 5. Create Faculty Member
  const facultyUser = await prisma.user.upsert({
    where: { email: "dr.anita.sharma@aist.edu.in" },
    update: {},
    create: {
      clerkId: "clerk_faculty_anita_demo",
      email: "dr.anita.sharma@aist.edu.in",
      firstName: "Dr. Anita",
      lastName: "Sharma",
      role: UserRole.FACULTY,
      status: UserStatus.ACTIVE,
      facultyProfile: {
        create: {
          collegeId: college.id,
          departmentId: cseDept.id,
          designation: "Associate Professor & Head of Labs",
          employeeCode: "FAC-CSE-019",
          specialization: "Distributed Computing & Cloud Architectures",
        },
      },
    },
    include: { facultyProfile: true },
  });

  // 6. Create Student
  const studentUser = await prisma.user.upsert({
    where: { email: "aarav.patel@student.aist.edu.in" },
    update: {},
    create: {
      clerkId: "clerk_student_aarav_demo",
      email: "aarav.patel@student.aist.edu.in",
      firstName: "Aarav",
      lastName: "Patel",
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          collegeId: college.id,
          departmentId: cseDept.id,
          rollNumber: "22CSE042",
          batchYear: 2026,
          currentSemester: 6,
          cgpa: 8.84,
          headline: "Aspiring Full-Stack & Systems Engineer | Open Source Enthusiast",
          bio: "Pre-final year CSE student passionate about resilient distributed systems, modern web architectures, and developer tooling.",
          portfolioUrl: "https://aaravpatel.dev",
          githubUrl: "https://github.com/aaravpatel",
          linkedinUrl: "https://linkedin.com/in/aaravpatel",
        },
      },
    },
    include: { studentProfile: true },
  });

  // 7. Add Student Skills & Verification
  if (studentUser.studentProfile && facultyUser.facultyProfile) {
    const studentId = studentUser.studentProfile.id;
    const facultyId = facultyUser.facultyProfile.id;

    // TypeScript skill (Verified)
    const tsSkill = skillRecords.find((s) => s.name === "TypeScript")!;
    const stSkill1 = await prisma.studentSkill.upsert({
      where: { studentId_skillId: { studentId, skillId: tsSkill.id } },
      update: {},
      create: {
        studentId,
        skillId: tsSkill.id,
        level: SkillLevel.ADVANCED,
        verificationStatus: VerificationStatus.VERIFIED,
        proofUrl: "https://github.com/aaravpatel/compiler-lab",
      },
    });

    await prisma.skillVerification.create({
      data: {
        studentSkillId: stSkill1.id,
        facultyId,
        status: VerificationStatus.VERIFIED,
        remarks: "Verified via Advanced Web Lab Capstone & GitHub code review.",
        verifiedAt: new Date(),
      },
    });

    // PostgreSQL skill (Pending Verification)
    const pgSkill = skillRecords.find((s) => s.name === "PostgreSQL")!;
    await prisma.studentSkill.upsert({
      where: { studentId_skillId: { studentId, skillId: pgSkill.id } },
      update: {},
      create: {
        studentId,
        skillId: pgSkill.id,
        level: SkillLevel.INTERMEDIATE,
        verificationStatus: VerificationStatus.PENDING,
        selfAssessmentNote: "Completed database indexing project and query optimization lab.",
      },
    });
  }

  // 8. Create Companies
  const company1 = await prisma.company.upsert({
    where: { slug: "nexus-cloud" },
    update: {},
    create: {
      name: "Nexus Cloud Innovations",
      slug: "nexus-cloud",
      industry: "Enterprise Cloud & Distributed Systems",
      website: "https://nexuscloud.io",
      headquarters: "Bengaluru, Karnataka",
      size: "501-1000",
      isVerified: true,
      verifiedAt: new Date(),
      description: "Global leader in distributed cloud infrastructure, microservices orchestration, and AI-accelerated developer platforms.",
    },
  });

  const company2 = await prisma.company.upsert({
    where: { slug: "quantumedge" },
    update: {},
    create: {
      name: "QuantumEdge Robotics",
      slug: "quantumedge",
      industry: "Robotics & Embedded AI",
      website: "https://quantumedge.tech",
      headquarters: "Hyderabad, Telangana",
      size: "51-200",
      isVerified: true,
      verifiedAt: new Date(),
      description: "Pioneering autonomous industrial robotics, embedded computer vision, and IoT intelligence.",
    },
  });

  // 9. Create Recruiter
  await prisma.user.upsert({
    where: { email: "siddharth.sen@nexuscloud.io" },
    update: {},
    create: {
      clerkId: "clerk_recruiter_siddharth_demo",
      email: "siddharth.sen@nexuscloud.io",
      firstName: "Siddharth",
      lastName: "Sen",
      role: UserRole.INDUSTRY_RECRUITER,
      status: UserStatus.ACTIVE,
      companyMembers: {
        create: {
          companyId: company1.id,
          designation: "Lead Technical Recruiter",
          isPrimaryContact: true,
        },
      },
    },
  });

  // 10. Create Jobs & Internships
  const internshipJob = await prisma.job.create({
    data: {
      companyId: company1.id,
      title: "Full-Stack Cloud Engineer Intern",
      type: JobType.INTERNSHIP,
      status: JobStatus.PUBLISHED,
      location: "Bengaluru, Hybrid",
      isRemote: false,
      stipendMonthly: 45000,
      openings: 5,
      description: "Join the Core Platform team to architect scalable Next.js and Go microservices, build observability tooling, and integrate enterprise cloud APIs.",
      requirements: "Strong proficiency in TypeScript, React, and REST/GraphQL services. Familiarity with Docker and relational databases like PostgreSQL.",
      skillsRequired: {
        create: [
          { skillId: skillRecords.find((s) => s.name === "TypeScript")!.id, requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
          { skillId: skillRecords.find((s) => s.name === "React")!.id, requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
          { skillId: skillRecords.find((s) => s.name === "PostgreSQL")!.id, requiredLevel: SkillLevel.BEGINNER, isMandatory: true },
        ],
      },
    },
  });

  // 11. Create Application for demo student
  if (studentUser.studentProfile) {
    await prisma.application.create({
      data: {
        studentId: studentUser.studentProfile.id,
        jobId: internshipJob.id,
        status: ApplicationStatus.INTERVIEWING,
        coverNote: "I have hands-on experience building full-stack web applications with Next.js and PostgreSQL.",
        interviews: {
          create: {
            title: "Technical Round 1 (Architecture & Code Walkthrough)",
            scheduledAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            durationMinutes: 45,
            meetingUrl: "https://meet.google.com/xyz-qwer-abc",
            interviewerNames: "Siddharth Sen (Lead Recruiter)",
          },
        },
      },
    });
  }

  // 12. Create Institutional Collaboration
  await prisma.collaboration.create({
    data: {
      collegeId: college.id,
      companyId: company1.id,
      title: "Next-Gen Cloud Microservices Center of Excellence",
      description: "Joint lab providing students and faculty access to live cloud sandboxes, guest lecture modules, and sponsored capstone grants.",
      status: CollaborationStatus.ACTIVE,
      startDate: new Date("2026-06-01"),
      endDate: new Date("2027-05-31"),
      programs: {
        create: [
          {
            title: "Enterprise Distributed Architecture Bootcamp",
            trainer: "Nexus Cloud Engineering Team",
            durationHours: 40,
          },
        ],
      },
    },
  });

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

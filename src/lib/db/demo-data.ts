import {
  UserRole,
  UserStatus,
  SkillLevel,
  VerificationStatus,
  JobType,
  JobStatus,
  ApplicationStatus,
  InterviewStatus,
  PlacementStatus,
  CollaborationStatus,
  DriveStatus,
  ResourceType,
  ResourceDifficulty,
} from "@prisma/client";

export const DEMO_COLLEGE = {
  id: "col_apex_01",
  name: "Apex Institute of Science & Technology",
  code: "AIST",
  slug: "apex-institute",
  website: "https://aist.edu.in",
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  isVerified: true,
};

export const DEMO_DEPARTMENTS = [
  {
    id: "dept_cse_01",
    name: "Computer Science & Engineering",
    code: "CSE",
    collegeId: DEMO_COLLEGE.id,
  },
  {
    id: "dept_ece_01",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    collegeId: DEMO_COLLEGE.id,
  },
];

export const DEMO_COMPANIES = [
  {
    id: "comp_nexus_01",
    name: "Nexus Cloud Innovations",
    slug: "nexus-cloud",
    industry: "Enterprise Cloud & Distributed Systems",
    website: "https://nexuscloud.io",
    headquarters: "Bengaluru, Karnataka",
    size: "501-1000",
    isVerified: true,
    description:
      "Global leader in distributed cloud infrastructure, microservices orchestration, and AI-accelerated developer platforms.",
  },
  {
    id: "comp_quantum_02",
    name: "QuantumEdge Robotics",
    slug: "quantumedge",
    industry: "Robotics & Embedded AI",
    website: "https://quantumedge.tech",
    headquarters: "Hyderabad, Telangana",
    size: "51-200",
    isVerified: true,
    description:
      "Pioneering autonomous industrial robotics, embedded computer vision, and IoT intelligence.",
  },
];

export const DEMO_SKILLS = [
  { id: "sk_ts_01", name: "TypeScript", category: "Programming", description: "Typed JavaScript for scalable web development" },
  { id: "sk_react_02", name: "React", category: "Framework", description: "Component-based UI library" },
  { id: "sk_next_03", name: "Next.js", category: "Framework", description: "Full-stack React framework with SSR & App Router" },
  { id: "sk_py_04", name: "Python", category: "Programming", description: "Multi-paradigm language for AI, data, and web" },
  { id: "sk_pg_05", name: "PostgreSQL", category: "Database", description: "Advanced open-source relational database" },
  { id: "sk_dock_06", name: "Docker", category: "Cloud/DevOps", description: "Containerization and microservice deployment" },
  { id: "sk_arch_07", name: "System Design", category: "Domain", description: "Scalable architecture and distributed patterns" },
  { id: "sk_comm_08", name: "Technical Communication", category: "Soft Skill", description: "Cross-functional articulation and documentation" },
  { id: "sk_ml_09", name: "Machine Learning", category: "Domain", description: "Statistical modeling, scikit-learn, PyTorch" },
  { id: "sk_fastapi_10", name: "FastAPI", category: "Framework", description: "High-performance Python API framework" },
];

export const DEMO_STUDENT = {
  id: "stu_aarav_01",
  userId: "usr_student_01",
  collegeId: DEMO_COLLEGE.id,
  departmentId: DEMO_DEPARTMENTS[0].id,
  rollNumber: "22CSE042",
  batchYear: 2026,
  currentSemester: 6,
  cgpa: 8.84,
  headline: "Aspiring Full-Stack & Systems Engineer | Open Source Enthusiast",
  bio: "Pre-final year CSE student passionate about resilient distributed systems, modern web architectures, and developer tooling.",
  portfolioUrl: "https://aaravpatel.dev",
  githubUrl: "https://github.com/aaravpatel",
  linkedinUrl: "https://linkedin.com/in/aaravpatel",
  user: {
    id: "usr_student_01",
    email: "aarav.patel@student.aist.edu.in",
    firstName: "Aarav",
    lastName: "Patel",
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
};

export const DEMO_FACULTY = {
  id: "fac_anita_01",
  userId: "usr_faculty_01",
  collegeId: DEMO_COLLEGE.id,
  departmentId: DEMO_DEPARTMENTS[0].id,
  designation: "Associate Professor & Head of Labs",
  employeeCode: "FAC-CSE-019",
  specialization: "Distributed Computing & Cloud Architectures",
  user: {
    id: "usr_faculty_01",
    email: "dr.anita.sharma@aist.edu.in",
    firstName: "Dr. Anita",
    lastName: "Sharma",
    role: UserRole.FACULTY,
    status: UserStatus.ACTIVE,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
};

export const DEMO_COLLEGE_ADMIN = {
  id: "admin_vikram_01",
  userId: "usr_tpo_01",
  collegeId: DEMO_COLLEGE.id,
  title: "Dean of Industry Relations & Head TPO",
  officePhone: "+91 80 2345 6789",
  user: {
    id: "usr_tpo_01",
    email: "vikram.malhotra@aist.edu.in",
    firstName: "Prof. Vikram",
    lastName: "Malhotra",
    role: UserRole.COLLEGE_ADMIN,
    status: UserStatus.ACTIVE,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
};

export const DEMO_RECRUITER = {
  id: "rec_siddharth_01",
  userId: "usr_recruiter_01",
  companyId: DEMO_COMPANIES[0].id,
  designation: "Lead Technical Recruiter",
  isPrimaryContact: true,
  user: {
    id: "usr_recruiter_01",
    email: "siddharth.sen@nexuscloud.io",
    firstName: "Siddharth",
    lastName: "Sen",
    role: UserRole.INDUSTRY_RECRUITER,
    status: UserStatus.ACTIVE,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
};

export const DEMO_SUPER_ADMIN = {
  id: "sa_shub_01",
  clerkId: "clerk_super_admin_01",
  email: "admin@academiaindustry.org",
  firstName: "Aishwarya",
  lastName: "Rao",
  role: UserRole.SUPER_ADMIN,
  status: UserStatus.ACTIVE,
  avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
};

export const DEMO_JOBS = [
  {
    id: "job_01",
    companyId: DEMO_COMPANIES[0].id,
    company: DEMO_COMPANIES[0],
    title: "Full-Stack Cloud Engineer Intern",
    type: JobType.INTERNSHIP,
    status: JobStatus.PUBLISHED,
    location: "Bengaluru, Hybrid",
    isRemote: false,
    stipendMonthly: 45000,
    salaryMin: null,
    salaryMax: null,
    openings: 5,
    description:
      "Join the Core Platform team to architect scalable Next.js and Go microservices, build observability tooling, and integrate enterprise cloud APIs.",
    requirements:
      "Strong proficiency in TypeScript, React, and REST/GraphQL services. Familiarity with Docker and relational databases like PostgreSQL.",
    createdAt: new Date("2026-10-15"),
    skillsRequired: [
      { skill: DEMO_SKILLS[0], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
      { skill: DEMO_SKILLS[1], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
      { skill: DEMO_SKILLS[4], requiredLevel: SkillLevel.BEGINNER, isMandatory: true },
      { skill: DEMO_SKILLS[5], requiredLevel: SkillLevel.BEGINNER, isMandatory: false },
    ],
  },
  {
    id: "job_02",
    companyId: DEMO_COMPANIES[0].id,
    company: DEMO_COMPANIES[0],
    title: "Software Engineer - Distributed Systems (FTE)",
    type: JobType.FULL_TIME,
    status: JobStatus.PUBLISHED,
    location: "Bengaluru, India",
    isRemote: true,
    salaryMin: 1400000,
    salaryMax: 2200000,
    stipendMonthly: null,
    openings: 3,
    description:
      "Seeking high-caliber graduate engineers to build resilient event-driven pipelines, high-concurrency microservices, and Kubernetes platform extensions.",
    requirements:
      "Solid foundation in data structures, algorithms, concurrency, and database indexing. Hands-on system design knowledge.",
    createdAt: new Date("2026-10-10"),
    skillsRequired: [
      { skill: DEMO_SKILLS[4], requiredLevel: SkillLevel.ADVANCED, isMandatory: true },
      { skill: DEMO_SKILLS[6], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
      { skill: DEMO_SKILLS[3], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
    ],
  },
  {
    id: "job_03",
    companyId: DEMO_COMPANIES[1].id,
    company: DEMO_COMPANIES[1],
    title: "Autonomous Robotics AI Engineer Intern",
    type: JobType.INTERNSHIP,
    status: JobStatus.PUBLISHED,
    location: "Hyderabad, On-site",
    isRemote: false,
    stipendMonthly: 40000,
    salaryMin: null,
    salaryMax: null,
    openings: 4,
    description:
      "Collaborate on computer vision models for factory automation robots, ROS2 navigation nodes, and sensor fusion algorithms.",
    requirements:
      "Proficiency in Python and C++, PyTorch, and basic OpenCV. Passion for hands-on hardware-software integration.",
    createdAt: new Date("2026-10-20"),
    skillsRequired: [
      { skill: DEMO_SKILLS[3], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
      { skill: DEMO_SKILLS[8], requiredLevel: SkillLevel.INTERMEDIATE, isMandatory: true },
      { skill: DEMO_SKILLS[9], requiredLevel: SkillLevel.BEGINNER, isMandatory: false },
    ],
  },
];

export const DEMO_STUDENT_SKILLS = [
  {
    id: "ss_01",
    skill: DEMO_SKILLS[0],
    level: SkillLevel.ADVANCED,
    verificationStatus: VerificationStatus.VERIFIED,
    verifiedBy: "Dr. Anita Sharma",
    verifiedAt: "2026-09-12",
    remarks: "Verified via Advanced Web Lab Capstone & GitHub code review.",
  },
  {
    id: "ss_02",
    skill: DEMO_SKILLS[1],
    level: SkillLevel.ADVANCED,
    verificationStatus: VerificationStatus.VERIFIED,
    verifiedBy: "Dr. Anita Sharma",
    verifiedAt: "2026-09-15",
    remarks: "Excellent component modularity and React hook patterns demonstrated.",
  },
  {
    id: "ss_03",
    skill: DEMO_SKILLS[2],
    level: SkillLevel.INTERMEDIATE,
    verificationStatus: VerificationStatus.VERIFIED,
    verifiedBy: "Dr. Anita Sharma",
    verifiedAt: "2026-10-01",
    remarks: "Demonstrated App Router and Server Actions in semester mini-project.",
  },
  {
    id: "ss_04",
    skill: DEMO_SKILLS[4],
    level: SkillLevel.INTERMEDIATE,
    verificationStatus: VerificationStatus.PENDING,
    verifiedBy: null,
    verifiedAt: null,
    remarks: "Submitted coursework on ACID transactions and index optimization.",
  },
  {
    id: "ss_05",
    skill: DEMO_SKILLS[5],
    level: SkillLevel.BEGINNER,
    verificationStatus: VerificationStatus.UNVERIFIED,
    verifiedBy: null,
    verifiedAt: null,
    remarks: "Self-assessed Docker compose containerization for lab apps.",
  },
];

export const DEMO_APPLICATIONS = [
  {
    id: "app_01",
    job: DEMO_JOBS[0],
    student: DEMO_STUDENT,
    status: ApplicationStatus.INTERVIEWING,
    appliedAt: "2026-10-18",
    matchScore: 92,
    currentRound: "Technical Round 2 (System Architecture)",
  },
  {
    id: "app_02",
    job: DEMO_JOBS[1],
    student: DEMO_STUDENT,
    status: ApplicationStatus.UNDER_REVIEW,
    appliedAt: "2026-10-22",
    matchScore: 84,
    currentRound: "Resume Screening by Hiring Manager",
  },
];

export const DEMO_INTERVIEWS = [
  {
    id: "int_01",
    jobTitle: "Full-Stack Cloud Engineer Intern",
    companyName: "Nexus Cloud Innovations",
    scheduledAt: "2026-11-04T14:30:00Z",
    durationMinutes: 45,
    interviewer: "Siddharth Sen (Lead Recruiter) & Tech Lead",
    status: InterviewStatus.SCHEDULED,
    meetingUrl: "https://meet.google.com/xyz-qwer-abc",
  },
];

export const DEMO_COLLABORATIONS = [
  {
    id: "collab_01",
    title: "Next-Gen Cloud Microservices Center of Excellence",
    college: DEMO_COLLEGE,
    company: DEMO_COMPANIES[0],
    status: CollaborationStatus.ACTIVE,
    startDate: "2026-06-01",
    endDate: "2027-05-31",
    description:
      "Joint lab providing students and faculty access to live cloud sandboxes, guest lecture modules, and sponsored capstone grants.",
    activePrograms: 3,
    studentsTrained: 180,
  },
  {
    id: "collab_02",
    title: "Autonomous Robotics & Edge AI Training Initiative",
    college: DEMO_COLLEGE,
    company: DEMO_COMPANIES[1],
    status: CollaborationStatus.ACTIVE,
    startDate: "2026-08-15",
    endDate: "2027-08-14",
    description:
      "Industry-aligned curriculum elective on ROS2 and embedded vision with hands-on lab hardware kit sponsorship.",
    activePrograms: 2,
    studentsTrained: 95,
  },
];

# Academia–Industry Connect: API Contracts & AI Microservice Integration

## 1. Overview

This document specifies:
1. Internal Next.js Route Handler contracts.
2. The asynchronous integration boundaries and REST API contracts for the future **Python FastAPI AI Microservice**.

---

## 2. Next.js Route Handlers

### 2.1. Skills Directory
- **Endpoint**: `GET /api/skills`
- **Query Params**: `?category=Programming` (optional)
- **Response**:
```json
{
  "skills": [
    {
      "id": "sk_ts_01",
      "name": "TypeScript",
      "category": "Programming",
      "description": "Typed JavaScript for scalable web development"
    }
  ]
}
```

### 2.2. Application Submission
- **Endpoint**: `POST /api/applications`
- **Authorization**: `STUDENT` role session
- **Request Body**:
```json
{
  "jobId": "job_01",
  "coverNote": "Experienced in React, Next.js, and PostgreSQL indexing."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "application": {
    "id": "app_sub_1761912000000",
    "studentId": "stu_aarav_01",
    "jobId": "job_01",
    "status": "SUBMITTED"
  }
}
```

### 2.3. Clerk Identity Webhook
- **Endpoint**: `POST /api/auth/webhook`
- **Headers**: `svix-id`, `svix-timestamp`, `svix-signature`
- **Supported Events**: `user.created`, `user.updated`, `user.deleted`

---

## 3. Python FastAPI AI Engine Contracts (Decoupled Microservice)

The AI engine runs independently (e.g., on `http://localhost:8000`) and provides natural language processing, vector embeddings, resume parsing, and semantic match scoring.

### 3.1. Resume Parsing & Skill Extraction
- **Endpoint**: `POST /ai/v1/resume/parse`
- **Headers**: `Authorization: Bearer <AI_SERVICE_API_KEY>`, `Content-Type: multipart/form-data`
- **Payload**: `file: resume.pdf`
- **Response**:
```json
{
  "status": "success",
  "extractedSkills": [
    { "name": "TypeScript", "confidence": 0.98, "detectedCategory": "Programming" },
    { "name": "Docker", "confidence": 0.89, "detectedCategory": "Cloud/DevOps" },
    { "name": "PostgreSQL", "confidence": 0.94, "detectedCategory": "Database" }
  ],
  "experienceYears": 1.5,
  "educationDegree": "Bachelor of Technology (Computer Science)",
  "rawTextSnippet": "..."
}
```

### 3.2. Student-Job Semantic Compatibility Scoring
- **Endpoint**: `POST /ai/v1/compatibility/score`
- **Headers**: `Authorization: Bearer <AI_SERVICE_API_KEY>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "studentId": "stu_aarav_01",
  "verifiedSkills": [
    { "name": "TypeScript", "level": "ADVANCED" },
    { "name": "React", "level": "ADVANCED" },
    { "name": "PostgreSQL", "level": "INTERMEDIATE" }
  ],
  "jobRequirements": {
    "jobId": "job_01",
    "requiredSkills": [
      { "name": "TypeScript", "level": "INTERMEDIATE", "mandatory": true },
      { "name": "React", "level": "INTERMEDIATE", "mandatory": true },
      { "name": "Docker", "level": "INTERMEDIATE", "mandatory": true }
    ]
  }
}
```
- **Response**:
```json
{
  "matchScore": 92.4,
  "matchedSkills": ["TypeScript", "React", "PostgreSQL"],
  "missingSkills": [
    { "skill": "Docker", "severity": 0.65, "requiredLevel": "INTERMEDIATE" }
  ],
  "compatibilitySummary": "Candidate exceeds language and frontend requirements. Gap identified in containerization."
}
```

### 3.3. Skill Gap & Curricular Recommendation
- **Endpoint**: `POST /ai/v1/skill-gap/recommend`
- **Headers**: `Authorization: Bearer <AI_SERVICE_API_KEY>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "studentId": "stu_aarav_01",
  "targetJobRoles": ["Cloud Engineer", "Distributed Systems Engineer"]
}
```
- **Response**:
```json
{
  "studentId": "stu_aarav_01",
  "primaryGaps": [
    {
      "skill": "Docker",
      "currentLevel": "BEGINNER",
      "targetLevel": "INTERMEDIATE",
      "marketDemandPercentile": 88
    }
  ],
  "recommendedLearningResources": [
    {
      "title": "Containerization Patterns & Multi-Stage Builds",
      "resourceId": "res_dock_01",
      "provider": "Cloud Native Academy",
      "estimatedHours": 14
    }
  ]
}
```

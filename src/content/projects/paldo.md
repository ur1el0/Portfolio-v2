---
title: "Paldo"
summary: "A scholarship portal for eligibility checks, applications, document uploads, and review tracking."
featured: true
order: 3
role: "Backend Contributor"
period: "2026"
image: "/assets/projects/paldo.png"
techStack: ["C#", "ASP.NET Core", "React", "PostgreSQL", "Docker"]
githubUrl: "https://github.com/pak-pow/OpenIT_Capstone.git"
liveUrl: "https://paldos.vercel.app"
metrics: ["Scholarship Eligibility Matching", "Student & Admin Workflows", "ASP.NET Core REST API"]
---

## Context
Local scholarship programs need one workflow for publishing opportunities, checking student eligibility, receiving applications, and keeping applicants informed as submissions are reviewed.

## What I built
* Restricted scholarship application status changes to authorized roles, sanitized application data, and added an API health check.
* Added backend authentication and tests, improved application-modal accessibility, and removed tracked build artifacts.

## Technical approach
* ASP.NET Core services separate HTTP controllers from scholarship, eligibility, and application workflows.
* Entity Framework Core maps student, scholarship, application, document, and notification records to PostgreSQL.
* Typed DTOs and model validation shape API requests and responses, while application services enforce eligibility and status rules.

## Security and verification
* JWT authentication and role-based access protect student and administrator workflows.
* API validation checks submitted profile and application data before it reaches the database.
* Application documents are reviewed through staff workflows; the repository does not implement automated OCR verification.

## Current limits
* Developed as an Open iT bootcamp capstone with demo sign-in and sample scholarship data.
* Document proof verification remains a manual reviewer task; automated OCR is not implemented.

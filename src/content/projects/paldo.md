---
title: "Paldo"
summary: "A scholarship portal for students and local providers to match eligibility, submit applications, upload documents, and track review status."
featured: true
order: 4
role: "Backend Developer"
period: "2026"
kicker: "Team capstone / Backend Developer"
image: "/assets/projects/paldo.png"
techStack: ["ASP.NET Core", "React", "PostgreSQL", "Entity Framework Core", "Docker", "JWT"]
githubUrl: "https://github.com/pak-pow/OpenIT_Capstone.git"
liveUrl: "http://paldos.vercel.app"
metrics: ["Scholarship Eligibility Matching", "Student & Admin Workflows", "ASP.NET Core REST API"]
---

## Context
Local scholarship programs need one workflow for publishing opportunities, checking student eligibility, receiving applications, and keeping applicants informed as submissions are reviewed.

## What I built
* Built ASP.NET Core REST endpoints for student profiles, scholarship programs, applications, and supporting documents.
* Implemented eligibility matching against profile criteria such as GWA, household income, course, and barangay.
* Developed React student and administrator interfaces for browsing programs, submitting applications, and managing scholarship records.

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

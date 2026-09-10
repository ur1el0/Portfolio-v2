---
title: "Gridy"
summary: "A web and mobile barangay information and management system modernizing document requests, urgency-categorized issue reporting, and public announcements."
featured: true
order: 1
role: "Lead Backend Developer"
period: "2026 - Present"
kicker: "Team capstone / Lead Backend Developer"
image: "/assets/projects/gridy.png"
techStack: ["Django REST Framework", "React", "Flutter", "PostgreSQL", "Docker", "Firebase FCM", "Cloudinary"]
githubUrl: "https://github.com/ur1el0/Gridy"
liveUrl: "https://gridy-nine.vercel.app"
metrics: ["HttpOnly JWT & Audit Logging", "OpenAPI-Driven Backend Contracts", "Docker Containerization"]
---

## Context
Barangay residents and local administrators require separate authorization scopes for certificate issuance, dispute tracking, and emergency bulletins while guaranteeing citizen data privacy across web and mobile clients.

## What I built
* Architected policy-protected Django REST Framework endpoints managing citizen identity verification, document applications, urgency-tagged issue reporting, and announcements.
* Implemented secure authentication with HttpOnly JWT cookies, refresh-token rotation, and automated audit logging for administrative accountability.
* Integrated Firebase Cloud Messaging (FCM) for sub-second emergency broadcasts and Cloudinary for authenticated document proof storage.

## Technical approach
* OpenAPI schema contracts serve as the single source of truth between the Django REST backend and client platforms (React admin dashboard and Flutter mobile app).
* Role-Based Access Control (RBAC) is enforced at the serializer and viewset layers, guaranteeing that resident accounts can never read or mutate other households' records.
* File attachments (e.g. proof of residency, municipal certificates) are sanitized and validated for MIME types before streaming to cloud storage to prevent unauthenticated server exhaustion.
* Relational database tables enforce referential integrity across fee schedules, document issuance statuses, and audit timestamps.

## Security and verification
* Access tokens are retained in volatile client memory while refresh tokens are set exclusively as `HttpOnly`, `SameSite=Strict` cookies.
* Backend views implement rate limiting and request payload validation to prevent automated spamming on public request endpoints.
* Automated Django test suites verify role separation, authentication transitions, token rotation, and permission denial boundaries.

## Current limits
* Capstone system evaluated using synthetic barangay datasets. Formal institutional deployment requires municipal LGU infrastructure provisioning.
---
title: "Paldo"
summary: "A centralized scholarship platform featuring eligibility filtering, application tracking, and automated announcements."
featured: true
order: 4
role: "Backend Developer"
period: "2026"
kicker: "Team capstone / Backend Developer"
image: "/assets/projects/paldo.png"
techStack: ["ASP.NET Core", "React", "PostgreSQL", "Docker"]
githubUrl: "https://github.com/pak-pow/OpenIT_Capstone.git"
liveUrl: "http://paldos.vercel.app"
metrics: ["ASP.NET Core REST APIs", "React Interfaces", "PostgreSQL Containerization"]
---

## Context
Local government scholarship programs struggle with fragmented paper applications, manual eligibility screening, and lack of transparency for student status tracking.

## What I built
* Architected ASP.NET Core REST API services managing scholarship program definitions, eligibility criteria, student applications, and approval workflows.
* Modeled relational schemas in PostgreSQL supporting multi-step applicant pipelines, document metadata, and institutional reviewer assignments.
* Integrated Docker environments for local backend services and database provisioning across team workflows.

## Technical approach
* Built with ASP.NET Core following clean controller-service-repository patterns and strongly typed Data Transfer Objects (DTOs).
* Enforced eligibility validation rules (GPA thresholds, residency classifications, income brackets) directly in application service layers prior to status promotion.
* Modeled state machine transitions for applications (`Submitted` -> `Under Review` -> `Eligible` / `Rejected` -> `Disbursed`) ensuring immutable audit histories.
* PostgreSQL database indexes optimize student profile queries and reviewer queue filters.

## Security and verification
* Enforced role-based authorization ensuring applicants can only view their own submission records while institutional evaluators access assigned applicant pools.
* DTO validation and input model annotations sanitize payload parameters and enforce schema integrity.
* Automated integration tests cover scholarship CRUD workflows, status transition guards, and unauthorized route access rejection.

## Current limits
* Developed as an Open iT bootcamp capstone using synthetic student records and demo grant allocations.
* Automatic OCR document proof verification is not yet implemented; reviewer verification remains manual.
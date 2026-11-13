---
title: "KapitBayan"
summary: "A barangay services platform for resident requests, queues, assistance, and incident reporting."
featured: true
order: 1
role: "Full-Stack Developer"
period: "Jan - Nov 2026"
image: "/assets/projects/gridy.png"
techStack: ["Python", "Django REST Framework", "React", "PostgreSQL", "Flutter (Dart)"]
githubUrl: "https://github.com/ur1el0/KapitBayan"
liveUrl: "https://gridy-nine.vercel.app"
metrics: ["Resident & Staff Service Workflows", "React Web + Flutter Mobile", "Protected Evidence & Push Notifications"]
---

## Context
Residents need a place to request barangay services and follow their status, while staff need scoped tools for document requests, queues, incidents, assistance, and public updates. The platform connects these workflows across web and mobile clients while protecting resident records.

## What I built
* Led full-stack development of resident and staff workflows for document requests, queues, assistance, and incident reporting.
* Implemented resident transfer and document-payment workflows, barangay-scoped access, protected media, and Firebase notifications across the React web portal and Flutter mobile app.

## Technical approach
* Django migrations define the relational data model, while the generated OpenAPI schema documents the API contracts used by the React and Flutter clients.
* Permissions scope resident, barangay staff, field personnel, and oversight workflows to their respective roles and records.
* Cloudinary stores uploaded evidence; the backend controls access to private identity and payment files.
* Docker Compose provisions the database and web services for local development and demos.

## Security and verification
* JWT authentication uses short-lived access tokens and refresh-token rotation and blacklisting.
* Private identity and payment evidence is served through authenticated views rather than public storage URLs.
* Fee assessment, payment verification, document approval, and assistance decisions remain staff-controlled.

## Current limits
* The platform records payment evidence but does not process payments through a gateway; treasury staff verify settlement and service decisions.
* The repository documents local development and pilot workflows; it does not by itself establish production deployment or institutional rollout.

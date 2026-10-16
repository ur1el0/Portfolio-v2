---
title: "KapitBayan"
summary: "A barangay service platform connecting residents and staff through document requests, queues, assistance, incident reports, and public information."
featured: true
order: 1
role: "Lead Backend Developer"
period: "2026 - Present"
kicker: "Team capstone / Lead Backend Developer"
image: "/assets/projects/gridy.png"
techStack: ["Django REST Framework", "React", "Flutter", "PostgreSQL", "Docker", "Firebase FCM", "Cloudinary"]
githubUrl: "https://github.com/ur1el0/KapitBayan"
liveUrl: "https://gridy-nine.vercel.app"
metrics: ["Resident & Staff Service Workflows", "React Web + Flutter Mobile", "Protected Evidence & Push Notifications"]
---

## Context
Residents need a place to request barangay services and follow their status, while staff need scoped tools for document requests, queues, incidents, assistance, and public updates. The platform connects these workflows across web and mobile clients while protecting resident records.

## What I built
* Built Django REST Framework endpoints for document requests, fee assessment, queue services, assistance requests, incident reports, and public information.
* Developed a React web portal for resident and staff workflows and a Flutter mobile app for residents and field personnel.
* Integrated Cloudinary-backed evidence storage and Firebase Cloud Messaging for request-status and queue notifications, with private media served through authenticated backend views.

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

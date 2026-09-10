---
title: "Lock-Ad"
summary: "A cautious commuter navigation platform designing end-to-end route-planning workflows with Django REST Framework, React, and containerized PostgreSQL schemas."
featured: true
order: 3
role: "Solo Developer"
period: "2025 - Present"
kicker: "Personal solo project / Solo Developer"
image: "/assets/projects/lockad.png"
techStack: ["Django REST Framework", "React", "PostgreSQL", "Docker", "Python", "JavaScript"]
githubUrl: "https://github.com/ur1el0/Lock-Ad-v3.git"
metrics: ["End-to-End Route Workflows", "Docker Containerization", "Production PostgreSQL Schemas"]
---

## Context
Commuters navigating unfamiliar or high-incident routes lack localized safety advisories, structured incident reporting, and verified safe-pathway routing across municipal transit corridors.

## What I built
* Engineered Django REST Framework spatial and route-planning endpoints mapping localized safety zones, incident hot-spots, and commuter alert corridors.
* Implemented relational schemas in PostgreSQL to store geocoded waypoint coordinates, hazard classifications, and time-stamped incident logs.
* Containerized backend API services and database configurations with Docker Compose for reproducible local development and staging environments.

## Technical approach
* Client map and pathing requests from React communicate with Django REST viewsets designed around coordinate boundary queries.
* Waypoints and danger-flagged sectors are indexed with relational coordinates and spatial bounding boxes to prevent full-table scans during route evaluation.
* Structured API validation contracts verify incoming community incident reports (timestamps, category codes, latitude/longitude bounds) before database persistence.
* Docker Compose orchestrates the Python web service, PostgreSQL database container, and network isolation boundaries.

## Security and verification
* Incident submission endpoints enforce payload sanitization, coordinate boundary validation, and rate limiting to prevent automated coordinate spoofing.
* Django test cases validate CRUD endpoints, coordinate format parsers, and permission checks for administrative incident verification.
* Environment configurations isolate database secrets and API credentials across container boundaries.

## Current limits
* Route calculations currently run on bounding-box approximations rather than a dedicated external routing graph engine (such as pgRouting or OSRM).
* Incidents rely on synthetic community verification data; real-time transit telemetry integration is planned for future iterations.
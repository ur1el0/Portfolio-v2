---
title: "Lock-Ad"
summary: "A walking-route app for Philippine commuters, with local context on lighting, infrastructure, weather, and community reports."
featured: true
order: 5
role: "Personal Project"
period: "Sep 2025 - Present"
image: "/assets/projects/lockad.png"
techStack: ["Python", "Django REST Framework", "React", "Leaflet", "OpenRouteService", "Docker", "Gemini"]
githubUrl: "https://github.com/ur1el0/Lock-Ad-v3.git"
metrics: ["Walking Route Previews", "OpenRouteService Integration", "Session Auth + CSRF"]
---

## Context
Commuters need useful context before choosing a walking route. Lock-Ad brings route distance and travel time together with available lighting, infrastructure, weather, and community-report signals without presenting any route as guaranteed safe.

## What I built
* Built a Django REST backend and React/Vite client with registration, login, protected pages, and walking-route preview workflows.
* Integrated OpenRouteService through the backend to request walking routes and return route geometry, distance, and estimated travel time.
* Added safety-data workflows for community incident reports and advisory inputs, including moderator review tools.

## Technical approach
* The React client sends route requests to Django; the OpenRouteService key stays on the server rather than in the browser.
* Session authentication and CSRF protection secure browser requests, while backend serializers validate route coordinates and profiles.
* Safety advisory requests validate their inputs and use endpoint-specific rate limits; incident media is restricted to authorized staff.
* SQLite supports local development, while Docker Compose can provision PostgreSQL and Redis services.

## Security and verification
* The browser uses Django session authentication with CSRF tokens for state-changing requests.
* Incident evidence is protected behind staff authorization, and AI analysis is a moderator aid rather than an automatic report approval.
* Provider keys and database credentials are configured through environment files and kept out of the frontend.

## Current limits
* Route safety is advisory and depends on the coverage and freshness of available reports, weather, and public data; no route is guaranteed safe.
* The project is still developing its safety-data coverage and deployment setup, so configured providers and live service status need separate verification.

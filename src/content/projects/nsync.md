---
title: "NSync"
summary: "An Android learning app for notes, linked flashcards, review sessions, and progress tracking."
featured: true
order: 4
role: "Android Project"
period: "May - Jun 2026"
image: "/assets/projects/nsync.png"
techStack: ["Kotlin", "Jetpack Compose", "Python", "Django REST Framework", "PostgreSQL", "Docker"]
githubUrl: "https://github.com/ur1el0/NSync.git"
metrics: ["Notes, Flashcards & Review Sessions", "Native Jetpack Compose UI", "XP, Streak & Mastery Tracking"]
---

## Context
Students need a simple way to capture ideas, turn them into review cards, and see how their learning changes over time. NSync organizes notes, flashcards, review sessions, and progress in one Android app.

## What I built
* Built an Android learning app for notes, linked flashcards, review sessions, and progress tracking.
* Implemented authenticated app-to-backend flows, review-result calculation, duplicate-answer checks, and note-level card counts.

## Technical approach
* Compose screens communicate through ViewModels and repositories, with Retrofit and OkHttp carrying requests to the backend.
* Android DataStore stores the local JWT session; an authentication interceptor attaches access tokens to protected API requests.
* Django serializers and user-scoped querysets keep notes, flashcards, and review progress associated with the signed-in account.
* Android notification scheduling supports local review reminders, while PostgreSQL persists the account's learning data.

## Security and verification
* JWT access and refresh tokens support login, session restoration, token refresh, and logout.
* The client attempts one refresh-and-retry when an access token expires, then clears the stored session if re-authentication is required.
* Protected API resources return only records owned by the authenticated user.

## Current limits
* NSync is an academic Android project with an API-backed workflow; offline-first synchronization is not implemented.
* AI-generated cards and advanced spaced-repetition scheduling are outside the current implementation.

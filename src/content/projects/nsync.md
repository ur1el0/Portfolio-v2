---
title: "NSync"
summary: "A Kotlin study app for capturing notes, creating review cards, completing quiz-style sessions, and tracking learning progress through a Django REST API."
featured: true
order: 5
role: "Solo Android Final Project"
period: "2026"
kicker: "Solo Android project / Android & Backend Developer"
image: "/assets/projects/nsync.png"
techStack: ["Kotlin", "Jetpack Compose", "Django REST Framework", "PostgreSQL", "Retrofit", "DataStore"]
githubUrl: "https://github.com/ur1el0/NSync.git"
metrics: ["Notes, Flashcards & Review Sessions", "Native Jetpack Compose UI", "XP, Streak & Mastery Tracking"]
---

## Context
Students need a simple way to capture ideas, turn them into review cards, and see how their learning changes over time. NSync organizes notes, flashcards, review sessions, and progress in one Android app.

## What I built
* Developed a native Android application in Kotlin and Jetpack Compose for notes, flashcards, review sessions, dashboard, profile, and mastery views.
* Built a Django REST Framework API backed by PostgreSQL for registration, authentication, user-owned notes, flashcards, review outcomes, and progress.
* Added XP, accuracy, streak, and mastery updates after review sessions, plus local review preferences and scheduled reminders.

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

---
title: "NSync"
summary: "A cross-platform synchronization tool featuring a native Android user interface built with Jetpack Compose and automated background Python utilities."
featured: true
order: 5
role: "Solo Android Final Project"
period: "2026"
kicker: "Solo Android project / Android & Backend Developer"
image: "/assets/projects/nsync.png"
techStack: ["Kotlin", "Jetpack Compose", "Django REST Framework", "Docker", "Python"]
githubUrl: "https://github.com/ur1el0/NSync.git"
metrics: ["Native Jetpack Compose UI", "Kotlin Core Sync Modules", "Python Background Utilities"]
---

## Context
Mobile users needing periodic or event-driven data synchronization between mobile device storage and remote servers often face network drops, state drift, and unhandled offline conditions.

## What I built
* Developed a native Android application in Kotlin using modern Jetpack Compose declarative UI architecture.
* Built a companion Django REST Framework backend service handling payload ingestion, timestamped synchronization logs, and state reconciliation.
* Implemented background synchronization utilities and containerized server infrastructure using Docker.

## Technical approach
* Android client utilizes Kotlin Coroutines and StateFlow for reactive UI state management and asynchronous background operations without UI thread blockage.
* Sync protocols utilize timestamp-based delta checks to identify local records requiring upload or remote updates requiring client-side pull.
* The Django backend exposes serialized endpoints for conflict resolution, session validation, and batch record ingestion.
* Docker Compose handles isolated development and server testing environments.

## Security and verification
* API requests require token-based authentication headers verified on every synchronization handshake.
* Client-side error handling traps network timeouts and offline states, queuing updates locally until connectivity is restored.
* Test suites verify payload serialization, timestamp ordering, and error recovery on intermittent connection drops.

## Current limits
* Academic Android final project running in development and local emulator environments.
* Advanced multi-master peer-to-peer conflict resolution (e.g. CRDTs) is not implemented; server timestamp wins in conflict scenarios.
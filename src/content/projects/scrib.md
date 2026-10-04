---
title: "Scrib"
summary: "A real-time multiplayer word-building game utilizing Django Channels WebSockets to synchronize game state, featuring a 16-cube letter matrix and instantaneous dictionary validation."
featured: true
order: 2
role: "Solo Developer"
period: "August - September 2026"
kicker: "Personal project / Solo Developer"
image: "/assets/projects/scrib.png"
techStack: ["React", "TypeScript", "Tailwind CSS", "Python", "Django", "WebSockets", "Redis", "Celery", "SQLite"]
githubUrl: "https://github.com/ur1el0/Scrib"
liveUrl: "https://scrib-ni-roosc.vercel.app"
metrics: ["170k+ Word Dictionary Validation", "Django Channels WebSockets", "Concurrent Real-Time Sync"]
---

## Context
Synchronous multiplayer word games demand instantaneous dictionary validation, synchronized room state across connected peers, and rapid resolution without blocking server event loops. I built Scrib as a real-time multiplayer practice tool where players compete to build words from a shared 16-cube letter matrix before the round timer ends.

## What I built
* Built a real-time multiplayer word-game practice tool utilizing Django Channels WebSockets to synchronize game state across concurrent connections.
* Engineered a validation engine that evaluates submitted words against a bundled dictionary of 170,000+ words.
* Developed an interactive React and TypeScript frontend with live turn timers, real-time board rendering, and automated score tallies.

## Technical approach
* **Real-time State Sync:** Django Channels handles WebSocket connection groups, broadcasting game transitions (lobby, round active, scoring, round end) to all players in a room without polling overhead.
* **Game Logic Engine:** The backend generates a randomized 16-cube letter matrix and validates submissions by performing character subset matching. Tiles can be used in any order, removing the need for contiguous path search overhead during gameplay.
* **Dictionary Validation:** The TWL06 word list (170k+ words) is loaded into memory on server initialization to allow rapid validation. Post-round summaries leverage full-list scans against the board permutations to display missed words.
* **Client Architecture:** The React client manages local input buffers and word queues, reconciling confirmed submissions against WebSocket state broadcasts to maintain low perceived latency.

## Security and verification
* Word validation occurs authoritatively on the backend; client-submitted word lists are rigorously checked and rejected if tiles are reused beyond their availability on the generated board matrix.
* WebSocket connection handlers validate room IDs and session payloads to prevent unauthorized state injection across active rooms.
* Designed the system to isolate local in-memory state during development, with infrastructure ready to integrate Redis channel layers and Celery workers for distributed multi-server deployments.

## Current limits
* The current primary branch utilizes an in-memory Channels layer and SQLite database; persistent match leaderboards and horizontal multi-server scaling would require transitioning fully to the planned Redis and Celery stack.
* While the CV outlines advanced Trie and DFS optimizations, the current public repository demonstrates a simplified string-matching algorithm to reduce computational complexity and recursion overhead in the MVP phase.
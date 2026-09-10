---
title: "Scrib"
summary: "A real-time multiplayer Boggle-style word game and solver featuring an optimized Trie & DFS traversal engine evaluating 16-cube matrices against 170k words."
featured: true
order: 2
role: "Solo Developer"
period: "2026"
kicker: "Personal project / Solo Developer"
image: "/assets/projects/scrib.png"
techStack: ["React", "TypeScript", "Tailwind CSS", "Python", "Django", "WebSockets"]
githubUrl: "https://github.com/ur1el0/Scrib"
liveUrl: "https://scrib-ni-roosc.vercel.app"
metrics: ["170k+ Dictionary Trie Engine", "Django Channels WebSockets", "Sub-10ms Matrix Solver"]
---

## Context
Synchronous multiplayer word games demand instantaneous dictionary validation, synchronized room state across connected peers, and rapid Boggle matrix resolution without blocking server event loops.

## What I built
* Designed an in-memory Prefix Trie structure in Python coupled with a Depth-First Search (DFS) traversal solver that indexes and evaluates 170,000+ words across a 4x4 matrix in under 10ms.
* Implemented real-time room orchestration and state broadcasting using Django Channels WebSockets.
* Built an interactive React and TypeScript frontend with live turn timers, submitted word tracking, and automated score tallies.

## Technical approach
* The dictionary is loaded into memory as a trie node graph at server initialization, enabling O(L) prefix lookups (where L is word length) instead of repetitive O(N) list searches.
* The board solver executes a DFS with 8-directional neighbor exploration and cell-visited backtracking, pruning search paths immediately when a prefix is absent from the Trie.
* Django Channels handles WebSocket connection groups, broadcasting game transitions (lobby, round active, scoring, round end) to all players in a room without polling overhead.
* Client state manages local input buffers and word queues, reconciling confirmed submissions against WebSocket state broadcasts.

## Security and verification
* Word validation occurs authoritatively on the backend Trie engine; client-submitted word lists are rejected if cells are non-contiguous or reused.
* WebSocket connection handlers validate room IDs and session payloads to prevent unauthorized state injection across active rooms.
* Unit tests verify Trie insertion, prefix matching, DFS board solving against known grid fixtures, and dictionary lookup edge cases.

## Current limits
* In-memory Trie is held per-process in Python; multi-server scaling would require shared memory caching or distributed worker sync.
* Designed as an algorithmic practice and competitive word game MVP; persistent match leaderboards are pending future database backing.
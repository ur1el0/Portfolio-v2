---
title: "Scrib"
summary: "A real-time multiplayer Boggle-style word game and solver featuring an optimized Trie & DFS traversal engine evaluating 16-cube matrices against 170k words."
featured: true
order: 2
role: "Creator & Backend Engineer"
period: "2026"
techStack: ["React", "TypeScript", "Tailwind CSS", "Python", "Django", "WebSockets"]
githubUrl: "https://github.com/ur1el0/Scrib"
liveUrl: "https://scrib-ni-roosc.vercel.app"
metrics: ["170k+ Dictionary Trie Engine", "Django Channels WebSockets", "Sub-10ms Matrix Solver"]
---

### Problem Statement
Building a synchronous multiplayer word game requires high-frequency state updates, zero-latency validation of user-submitted words, and rapid matrix solving algorithms without server lockup.

### Key Technical Obstacles Overcome
* **Trie Data Structure & DFS Traversal:** Designed a prefix trie memory structure in Python coupled with Depth-First Search (DFS) matrix traversal to evaluate thousands of valid word paths across a 4x4 grid in under 10ms.
* **WebSocket State Synchronization:** Leveraged Django Channels to broadcast player turns, score updates, and time-sync events across connected rooms.
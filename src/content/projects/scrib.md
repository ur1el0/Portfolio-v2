---
title: "Scrib"
summary: "A WebSocket multiplayer Boggle practice game for the MSEUF English Festival, with a 4x4 dice board, timed rounds, and server-side word validation."
featured: true
order: 2
role: "Solo Developer"
period: "August - September 2026"
kicker: "Personal project / Solo Developer"
image: "/assets/projects/scrib.png"
techStack: ["React 19", "TypeScript", "Tailwind CSS", "Django", "Django Channels", "Daphne", "SQLite"]
githubUrl: "https://github.com/ur1el0/Scrib"
liveUrl: "https://scrib-ni-roosc.vercel.app"
metrics: ["TWL06 Dictionary Validation", "Trie-Backed Missed-Word Solver", "WebSocket Multiplayer Rooms"]
---

## Context
The MSEUF English Festival uses timed Boggle-style rounds, so players need to practice on the same 4x4 letter board with the same adjacency and scoring rules. Scrib recreates that format for up to four players in a synchronized multiplayer room.

## What I built
* Built multiplayer rooms with a shared randomized Boggle-dice board, a three-minute round timer, and live score updates.
* Implemented server-side word validation against the TWL06 dictionary and the festival's letter-length scoring rules.
* Added a post-round board solver that lists valid words players missed.

## Technical approach
* **Real-time State Sync:** Django Channels broadcasts room state and game events to connected players over WebSockets.
* **Word Validation:** The backend checks dictionary membership and uses depth-first search to confirm a word follows adjacent board cells without reusing a tile.
* **Missed-Word Solver:** A Trie-backed depth-first search finds valid words on the board for the post-round summary.
* **Client Architecture:** The React and TypeScript client renders the board, timer, input, and scores from the room's live events.

## Security and verification
* The backend validates submitted words and calculates their scores, so client state cannot award unverified points.
* A submitted word must exist in the dictionary and be traceable through the board's adjacent cells.

## Current limits
* The current release uses an in-memory Channels layer and SQLite; persistent leaderboards and multi-server rooms would need shared channel storage and durable match data.

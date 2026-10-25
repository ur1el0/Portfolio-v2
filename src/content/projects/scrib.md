---
title: "Scrib"
summary: "A multiplayer word game with timed 4×4 dice rounds and server-validated scoring."
featured: true
order: 2
role: "Solo Developer"
period: "August - September 2026"
image: "/assets/projects/scrib.png"
techStack: ["React 19", "TypeScript", "Tailwind CSS", "Django", "Django Channels", "Daphne", "SQLite"]
githubUrl: "https://github.com/ur1el0/Scrib"
liveUrl: "https://scrib-ni-roosc.vercel.app"
metrics: ["TWL06 Dictionary Validation", "Tile-Based Missed-Word Solver", "WebSocket Multiplayer Rooms"]
---

## Context
Scrib is a practice game for timed word-building rounds at the MSEUF English Festival. Players use the letters on a shared 4x4 dice board to form words in any order, using each tile once. Synchronized rooms support up to four players.

## What I built
* Built multiplayer rooms with a shared randomized 4x4 dice board, a three-minute round timer, and live score updates.
* Implemented server-side word validation against the TWL06 dictionary and scoring at one point per letter.
* Added a post-round solver that lists playable words players missed, ordered by score and then alphabetically.

## Technical approach
* **Real-time State Sync:** Django Channels broadcasts room state and game events to connected players over WebSockets.
* **Word Validation:** The backend checks dictionary membership and verifies that each word can be made from the board's available tiles, using each tile once. A Q tile supplies the letters QU.
* **Missed-Word Solver:** The backend checks TWL06 dictionary entries against the board's available tiles, then sorts playable words by score and alphabetically for the post-round summary.
* **Client Architecture:** The React and TypeScript client renders the board, timer, input, and scores from the room's live events.

## Security and verification
* The backend validates submitted words and calculates their scores, so client state cannot award unverified points.
* A submitted word must exist in the dictionary and be makeable from the available board tiles; the backend also calculates the score.

## Current limits
* The current release uses an in-memory Channels layer and SQLite; persistent leaderboards and multi-server rooms would need shared channel storage and durable match data.

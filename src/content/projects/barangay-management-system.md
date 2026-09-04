---
title: "Gridy"
summary: "An enterprise-grade local governance platform modernizing document requests, real-time push notification broadcasts, and municipal issue tracking."
featured: true
order: 1
role: "Lead Full-Stack Developer & Architect"
period: "2026"
techStack: ["React", "TypeScript", "Django REST Framework", "PostgreSQL", "Flutter", "Docker", "Redis"]
githubUrl: "https://github.com/ur1el0/Gridy"
liveUrl: "https://gridy-nine.vercel.app"
metrics: ["Role-Based Access Control (RBAC)", "Multi-Channel Push Pipeline", "Optimized Query Indexing"]
---

### Problem Statement
Traditional barangay operations in municipal government units face severe manual administrative overhead, physical queuing bottlenecks for document requests, and delayed emergency announcements due to fragmented communication channels.

### Architectural Trade-offs
* **Relational Schema vs. Document Store:** Selected PostgreSQL over MongoDB to ensure atomic transactions (ACID compliance) for municipal fee records, document verification statuses, and citizen identity mappings.
* **REST API & Pub/Sub Queue:** Paired Django REST Framework with Redis task queues to handle asynchronous push notification delivery across mobile and web platforms without blocking client response threads.

### Key Technical Obstacles Overcome
1. **Multi-Tenant Role-Based Access Control (RBAC):** Implemented strict authorization scopes distinguishing municipal administrators, barangay officials, and public citizens at the API serializer level.
2. **Offline-Resilient Local Sync:** Architected local caching mechanisms for mobile clients built with Flutter to maintain read capability during weak network conditions in rural barangays.
3. **Database Query Optimization:** Reduced complex database query execution latency by indexing high-cardinality foreign key fields and implementing query isolation.

### Measurable Outcomes
* Streamlined document application processing times by automating request queues.
* Delivered sub-second push notification delivery for emergency municipal announcements.
# Architecture Overview

> **📝 TEMPLATE:** Replace placeholders with your actual architecture. This is a **starter scaffold** — expand, modify, or completely rewrite as your project grows.

Quick map of your system's components, data flows, and key decisions.

---

## System Components

**[Replace with your tech stack]**

Example:
- **Frontend:** React + TypeScript
- **Backend:** Node.js/Express REST API
- **Database:** PostgreSQL
- **Cache:** Redis (sessions)

---

## Data Flow

```
[Draw your data flow here]
```

Example:
```
User → Frontend → API Gateway → Backend → Database
                              ↓
                        External APIs
```

---

## Key Decisions

### Why [Technology/Pattern]?
**Problem:** [What you were solving]  
**Solution:** [What you chose]  
**Trade-off:** [What you gained/lost]

Example:
- **Why JWT tokens?** Stateless auth, easier horizontal scaling
- **Why PostgreSQL?** Need ACID compliance and relational data
- **Why monorepo?** Share types between frontend/backend

---

## Module Structure

```
[Describe your folder structure]
```

Example:
- `src/auth/` — authentication & authorization
- `src/api/` — REST endpoints
- `src/models/` — database models
- `tests/` — test suites

---

## 🔧 For AI Agents

**When working on this codebase:**
1. Keep this file updated when making architectural changes
2. Add new sections as the system grows (security, performance, deployment)
3. Link to specific files/directories that exemplify patterns
4. Remove template examples once you have real content
5. When making significant changes, create a ticket in `/.ai/TICKETS.md` first

**This file should answer:** "How does this system work?" for someone (or some AI) joining the project.

---

**Last Updated:** [YYYY-MM-DD]

# Coding Conventions & Patterns

> **📖 TEMPLATE:** Document project-specific conventions that differ from common practices. Keep this focused and practical.

---

## Code Style

**[Replace with your actual conventions]**

Example:
- **Naming:** camelCase for functions, PascalCase for classes, UPPER_SNAKE for constants
- **Files:** One component per file, filename matches export name
- **Formatting:** Prettier with 2-space indentation, 80-char line limit
- **Imports:** Absolute paths preferred, group by: stdlib → external → internal

---

## Architecture Patterns

**[Document patterns used in THIS project]**

Example:
- **Error Handling:** Always use custom error classes, never throw strings
- **Async/Await:** Preferred over promises/callbacks, wrap in try-catch
- **Database Queries:** Use repository pattern, no raw SQL in controllers
- **API Responses:** Always return `{ data, error, meta }` structure

---

## Common Gotchas

**[Project-specific pitfalls to avoid]**

Example:
- ⚠️ Don't use `Date.now()` — use `dateService.now()` for testability
- ⚠️ Always validate env vars on startup, not at usage time
- ⚠️ Never mutate request objects, clone before modification
- ⚠️ PostgreSQL uses `ILIKE` not `LIKE` for case-insensitive search

---

## Testing Conventions

**[How tests should be structured]**

**⚠️ TDD is MANDATORY for all new features:**
1. Write tests BEFORE implementation code
2. Follow Red-Green-Refactor cycle:
   - **Red:** Write failing tests first
   - **Green:** Write minimal code to pass tests
   - **Refactor:** Improve code while keeping tests green

Example:

## Language & BDD Framework Mapping

Use your ecosystem's native tools to turn specs into tests:

- PHP → Pest
- JavaScript/TypeScript → Jest (or Vitest)
- Python → Behave or pytest-bdd
- Java → Cucumber-JVM
- Ruby → RSpec (with Cucumber if desired)
- C# → SpecFlow
- Go → Ginkgo
- Swift → Quick/Nimble

Generated tests belong in your normal test directories (not under `/.ai`).

---

## Documentation Requirements

**[What needs documentation]**

Example:
- All public APIs must have JSDoc comments
- Complex algorithms need inline explanations
- Update `/.ai/ARCHITECTURE.md` when adding new services
- Create ticket in `/.ai/TICKETS.md` before starting major work

---

## Security Guidelines

**[Project-specific security rules]**

Example:
- Never log sensitive data (passwords, tokens, PII)
- All user input must pass through validation middleware
- Use parameterized queries for all database operations
- Secrets must be in environment variables, never hardcoded

---

## 🤖 For AI Agents

**When writing code:**
1. Follow the conventions documented above
2. **ALWAYS write tests BEFORE implementation** (TDD is mandatory)
3. If you discover a new pattern not documented here, add it
4. When conventions conflict with standard practices, follow THIS file
5. Ask the developer if you're unsure about a convention

**This file is authoritative** for this project's conventions, even if they differ from language/framework defaults.

---

**Last Updated:** [YYYY-MM-DD]

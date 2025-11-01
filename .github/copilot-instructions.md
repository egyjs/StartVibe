# GitHub Copilot Repository Instructions

> **⚠️ TEMPLATE FILE:** This is a starter template installed by StartVibe. **Customize this file** for your specific project. Replace all `[placeholders]` and examples with your actual project details.

This file provides repository-wide guidance for GitHub Copilot, Cursor, and similar AI assistants working in this codebase.

---

## Quick Start

**Before making changes, read:**
1. `/.ai/ARCHITECTURE.md` — system design and component boundaries
2. `/.ai/TICKETS.md` — current priorities and task backlog
3. `/.ai/CONVENTIONS.md` — project-specific coding patterns and style
4. `/.ai/features/*.md` — feature specifications

**First Actions (Critical):**
1. ✅ **Use planning tools:** Run `manage_todo_list` or equivalent to organize work
2. ✅ **Check for latest docs:** Use `mcp_context7_get-library-docs` or `mcp_web-search_full-web-search` for up-to-date documentation
3. ✅ **When user requests new features:** Create a ticket in `/.ai/TICKETS.md` FIRST, then implement

---

## Project Type

**[Replace this with your project description in 1-2 sentences]**

Example: "A Node.js REST API for e-commerce, using Express and PostgreSQL."

---

## Key Conventions

### Code Style
- Follow patterns documented in `/.ai/CONVENTIONS.md`
- [Add project-specific quick-reference items here]
- Example: "Use Prettier + ESLint, run `npm run lint:fix`"

### Testing
- [Describe your testing approach]
- Example: "Jest for unit tests, BDD-style specs, 80% coverage minimum"

### Documentation
- Update `/.ai/ARCHITECTURE.md` when changing system design
- Update `/.ai/TICKETS.md` when starting/completing tasks
- Update `/.ai/CONVENTIONS.md` when establishing new patterns
- Keep this file current as conventions evolve

---

## AI Workflow

### When User Requests New Features
1. **FIRST:** Create a ticket in `/.ai/TICKETS.md` with proper formatting
2. Check if detailed spec exists in `/.ai/features/`
3. If not, create feature spec file: `/.ai/features/YYYY-MM-DD_feature_name.md`
4. **BEFORE coding:** Write comprehensive test file based on BDD scenarios
5. Implement the feature to make tests pass
6. Update ticket status to "Done" when complete

### When Implementing Features (TDD Workflow)
1. Check `/.ai/TICKETS.md` for assigned work
2. Read feature spec from `/.ai/features/[date]_feature_[name].md`
3. Use up-to-date documentation (context7, web-search tools) for libraries
4. **Write comprehensive tests FIRST** based on Given/When/Then scenarios:
   - Create test file (e.g., `tests/auth.test.js`)
   - Write tests for ALL scenarios in feature spec
   - Write tests for edge cases and error conditions
   - Ensure tests fail (red phase)
5. Implement code to make tests pass (green phase)
6. Refactor if needed while keeping tests green
7. Update ticket status and documentation

### When Fixing Bugs
1. Create ticket in `/.ai/TICKETS.md` (type: Bug)
2. Write a failing test that reproduces the bug
3. Fix the code to make the test pass
4. Verify fix and check for similar patterns
5. Mark ticket as Done

### When Refactoring
1. Ensure comprehensive test coverage exists BEFORE refactoring
2. Make incremental changes
3. Run tests after each change
4. Update `/.ai/ARCHITECTURE.md` if design changes

---

## Security & Safety

**Never commit:**
- API keys, passwords, secrets, or credentials
- [Add project-specific sensitive data types]

**Always:**
- Validate and sanitize user input
- [Add project-specific security practices]

---

## Getting Help

**For requirements:** Check `/.ai/TICKETS.md` or ask the developer  
**For architecture:** Reference `/.ai/ARCHITECTURE.md`  
**For conventions:** See `/.ai/CONVENTIONS.md`  
**For CI/CD:** See `/.ai/ci_cd_instructions.md`  
**For Framework/library documentation:** Use `mcp_context7_get-library-docs` (context7) or `mcp_web-search_full-web-search` for latest documentation

---

## 🚨 Critical Rules for AI Agents

1. **Always start with planning:** Use `manage_todo_list` or similar tools before beginning work
2. **Ticket-first approach:** When user requests new features, create ticket in `/.ai/TICKETS.md` FIRST
3. **TDD is mandatory:** Write comprehensive tests BEFORE writing implementation code
4. **No unsolicited tickets:** Only add tickets when explicitly asked by the user
5. **Use fresh documentation:** Always query up-to-date library docs via context7 or web-search tools
6. **Update as you go:** Mark ticket statuses, update architecture docs, keep everything current

---

## 🎯 Customization Guide for AI Agents

**This is a template file — you should:**
1. Replace all `[placeholders]` with actual project details
2. Remove irrelevant sections (e.g., if no CI/CD, remove that section)
3. Add project-specific patterns and conventions
4. Keep this file **concise and actionable** (aim for 20-50 lines once customized)
5. Update regularly as the project evolves

**Think of this as a living document** that grows with your project, not a rigid checklist.

---

# Tickets (JIRA-Style)

> **🎫 TEMPLATE:** Track work items in a JIRA-like format. 
>
> **⚠️ IMPORTANT FOR AI AGENTS:** Only add tickets when **explicitly requested by users**. Do not proactively suggest or create tickets unless asked.

---

## 🔥 In Progress

### TICKET-001: [Title of task currently being worked on]
**Status:** In Progress  
**Priority:** High | Medium | Low  
**Type:** Feature | Bug | Task | Improvement  
**Story Points:** [1, 2, 3, 5, 8, 13]  

**Description:**  
[Clear description of what needs to be done and why]

**Acceptance Criteria:**
- [ ] [Specific, testable requirement 1]
- [ ] [Specific, testable requirement 2]
- [ ] **Comprehensive tests written FIRST** (TDD approach)
- [ ] [Tests written and passing]

**Related:**  
- Feature spec: `/.ai/features/YYYY-MM-DD_feature_name.md`
- Epic/Component: [If part of larger initiative]

---

## 📋 To Do (Ready for Development)

### TICKET-002: [Title of ready-to-start task]
**Status:** To Do  
**Priority:** High | Medium | Low  
**Type:** Feature | Bug | Task | Improvement  
**Story Points:** [Estimate]  

**Description:**  
[What needs to be done]

**Acceptance Criteria:**
- [ ] [Requirement 1]
- [ ] [Requirement 2]

---

## 🗂️ Backlog (Not Yet Prioritized)

### TICKET-003: [Title of future task]
**Type:** Feature | Bug | Task 
**Description:**  
[Brief description - minimal details until prioritized]

---

## ✅ Done

### TICKET-000: Initialize Project Structure
**Status:** Done  
**Completed:** 2025-11-02  
**Type:** Task  

**Notes:** Created initial folder structure and configuration files

---

## 🤖 Usage Guide

**For AI Agents:**
1. **Check this file FIRST** before starting any work
2. **DO NOT add tickets proactively** — only when user explicitly requests
3. **Follow TDD:** Write tests BEFORE implementation for all features
4. Update ticket status as work progresses (To Do → In Progress → Done)
5. Move completed tickets to "Done" section with completion date
6. Ask clarifying questions if requirements are unclear

**For Developers:**
1. Create tickets using the template format above
2. Use consistent TICKET-XXX numbering (increment from highest existing number)
3. Include acceptance criteria for all features
4. Link to detailed specs in `/.ai/features/` when applicable
5. Update story points and sprint assignments during planning

**Ticket Workflow:**  
`Backlog → To Do → In Progress → Done`

**Keep organized:** Detailed specifications belong in `/.ai/features/`, tickets are for tracking and prioritization.

---

**Last Updated:** [YYYY-MM-DD]

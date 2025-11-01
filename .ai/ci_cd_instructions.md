# CI/CD Instructions

> **🚀 TEMPLATE:** Customize for your deployment pipeline. Remove what you don't use, expand what you do. This helps AI understand what's safe to automate.

---

## Pipeline Overview

```
[Replace with your actual pipeline]
```

Example:
```
Push → Lint → Test → Build → Deploy to Staging → Production (manual approval)
```

---

## Quality Gates

**[Add your quality checks]**

Example:
- **Linting:** `npm run lint` (must pass)
- **Tests:** `npm test` (80% coverage required)
- **Build:** `npm run build` (must succeed)

---

## Commands Reference

### Safe for AI to Run ✅
```bash
# [Replace with your safe commands]
npm test
npm run lint
npm run build
```

### Requires Human Approval ❌
```bash
# [Replace with your protected commands]
npm run deploy:production
git push origin main
```

---

## Environment Variables

**Development:**
```bash
NODE_ENV=development
DATABASE_URL=[local database]
```

**Production:**
```bash
NODE_ENV=production
DATABASE_URL=[stored in secrets manager]
```

⚠️ **Never commit real credentials** — use `.env.example` for documentation.

---

## 🤖 For AI Agents

**You can automatically:**
- Run tests and report results
- Suggest fixes for failing tests
- Generate test cases

**You must ask first:**
- Deploying to any environment
- Modifying CI/CD configuration
- Changing dependencies in production

**Keep this file minimal** — only document what AI needs to know to work safely with your pipeline.

---

**Last Updated:** [YYYY-MM-DD]

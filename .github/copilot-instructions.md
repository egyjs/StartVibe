# StartVibe - AI Agent Instructions

**Project Type:** CLI tool (Node.js ESM) that bootstraps AI-ready documentation templates into any repository.

---

## Architecture Overview

StartVibe is a **single-script CLI bootstrapper** with zero runtime configuration:

- **Entry:** `bin/start-vibe.js` (executable via `npx start-vibe`)
- **Core behavior:** Recursively copies `templates/` directory into user's current working directory
- **Template structure shipped:**
  - `.ai/` — AI-focused documentation (ARCHITECTURE.md, TICKETS.md, CONVENTIONS.md, ci_cd_instructions.md, features/)
  - `.github/copilot-instructions.md` — GitHub Copilot guidance for target repos

**Key architectural decision:** Templates are **static markdown files**, not generated/dynamic. The tool is a dumb copier that respects existing files (prompts before overwriting unless `--force`).

---

## Development Workflow

### Testing Changes Locally
```bash
# Run CLI locally to test template installation
node bin/start-vibe.js

# Or test in another directory
cd /path/to/test-repo && node /path/to/StartVibe/bin/start-vibe.js
```

### Adding/Modifying Templates
1. Edit files in `templates/.ai/` or `templates/.github/`
2. Test locally by running the CLI in a throwaway directory
3. All template files are **copied as-is** — no preprocessing or variable substitution

### Publishing
```bash
npm version patch  # or minor/major
npm publish
```

---

## Code Conventions

### ES Modules (Not CommonJS)
- All imports use `import`, not `require()`
- `package.json` has `"type": "module"`
- Path resolution uses `fileURLToPath(import.meta.url)` instead of `__dirname`

### Path Handling (Windows-Compatible)
- Always use `path.join()` and `path.resolve()` for cross-platform paths
- Display paths use forward slashes: `toDisplayPath()` converts backslashes
- `templatesDir`: resolved relative to `bin/` directory (`../templates`)
- `targetDir`: always `process.cwd()` (user's current directory)

### User Interaction Pattern
- **Colored output:** Use `chalk` for visual feedback (green ✅, yellow ⚠️, red ✖)
- **Overwrite prompts:** Ask user Y/N before overwriting existing files (unless `--force`)
- **Silent mode:** Suppress all logs when `--silent` flag is used
- **Readline cleanup:** Always close `readline` interface in finally block

---

## CLI Options

| Flag | Behavior |
|------|----------|
| `--force` / `-f` | Skip prompts, overwrite all existing files |
| `--silent` / `-s` | Suppress informational logs |

**Note:** `--dry-run` mentioned in original spec but **not yet implemented**.

---

## Template Content Guidelines

When editing templates (in `templates/`), remember:

- **Templates are MEMIC & EXTENSIBLE:** They're concise starter files that AI agents should customize for their specific projects
- **Clear template markers:** Each template file starts with `> ⚠️ TEMPLATE:` or `> 📝 TEMPLATE:` to signal it needs customization
- **Use placeholders in square brackets** for user-specific content: `[YYYY-MM-DD]`, `[project name]`, `[linter name]`
- **Keep templates short (20-50 lines):** Remove verbose examples, keep only essential structure
- **Action-oriented instructions:** Each template includes a "🤖 For AI Agents" or "🔧 For AI Agents" section explaining how to customize it
- **Framework-agnostic:** Templates work for any language/tech stack
- **Behavior-driven focus:** Feature template emphasizes Given/When/Then BDD syntax
- **TDD mandatory:** Templates enforce Test-Driven Development - tests must be written before implementation
- **JIRA-style tickets:** TICKETS.md uses TICKET-XXX numbering with status workflow (Backlog → To Do → In Progress → Done)
- **AI guardrails:** Templates explicitly instruct AI to NOT add tickets proactively, use up-to-date docs (context7), and use planning tools first
- **Red-Green-Refactor:** Feature specs include comprehensive test specifications to write before coding
- **Living documents:** Templates explicitly state they should be expanded/modified as projects grow

**Philosophy:** Templates are **scaffolds**, not rigid checklists. AI agents should feel empowered to adapt, extend, or completely rewrite them for their project's needs.

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `commander` | CLI argument parsing |
| `fs-extra` | Promise-based file operations with `ensureDir`, `copyFile` |
| `chalk` | Terminal color/styling |
| `readline` | Interactive Y/N prompts |

**No build step required** — ships source code directly (Node.js interprets ESM natively).

---

## File Structure

```
StartVibe/
├── bin/start-vibe.js           # Executable entry point (shebang, ESM imports)
├── templates/                   # Template files to install in target repos
│   ├── .ai/
│   │   ├── ARCHITECTURE.md
│   │   ├── TICKETS.md
│   │   ├── CONVENTIONS.md
│   │   ├── ci_cd_instructions.md
│   │   └── features/[date]_feature_[feature_name].md
│   └── .github/
│       └── copilot-instructions.md
├── package.json                 # "bin": { "start-vibe": "./bin/start-vibe.js" }
├── README.md                    # End-user documentation
└── LICENSE                      # MIT license
```

---

## Common Tasks

### Adding a new template file
1. Create file in `templates/.ai/` or appropriate subdirectory
2. Use markdown with placeholder syntax `[description]`
3. Test by running CLI in a test directory
4. Update this file if it affects developer workflow

### Changing CLI behavior
- All logic lives in `bin/start-vibe.js` (single file by design)
- Modify `copyTemplates()` function for copy logic changes
- Update `program` configuration for new CLI flags

### Fixing Windows path issues
- Use `path.join()` / `path.resolve()` (never string concatenation)
- Test on Windows with Git Bash (user's default shell: `bash.exe`)
- Display paths should use `toDisplayPath()` for consistent forward-slash output

---

## Security & Safety

**Never include in templates:**
- Real API keys or secrets (use `[API_KEY]` placeholders)
- Personal information
- Large binary files

**CLI safety:**
- Always prompts before overwriting unless `--force`
- Operates only in `process.cwd()` (never touches parent directories)
- No network calls (completely offline tool)

---

## Known Limitations

1. **No template variable substitution** — templates are copied verbatim (future: could add project name injection)
2. **No language detection** — templates are framework-agnostic by design
3. **No Git integration** — doesn't auto-commit installed files (users commit manually)
4. **No interactive setup wizard** — all templates installed at once (future: could add selective installation)

---

## Testing Checklist Before Release

- [ ] Run CLI in empty directory (fresh install)
- [ ] Run CLI in directory with existing `.ai/` folder (overwrite prompts work)
- [ ] Test `--force` flag (no prompts, overwrites all)
- [ ] Test `--silent` flag (no console output)
- [ ] Verify paths work on Windows (Git Bash) and Unix
- [ ] Check templates render correctly after install

---

## Related Documentation

- **End-user docs:** `README.md`
- **Project concept:** `idea.txt` (original brainstorming conversation)
- **Templates overview:** Browse `templates/.ai/` for installed structure

---

**Last Updated:** November 1, 2025  
**Maintained By:** StartVibe contributors

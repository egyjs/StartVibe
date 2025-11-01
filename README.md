# StartVibe

StartVibe is a zero-config CLI bootstrapper that drops AI-first documentation into any repository. Install once or run via `npx` to instantly scaffold collaboration-ready instructions for large language models.

## Installation

```bash
npm install -g startvibe
```

Or use `npx`:

```bash
npx start-vibe
```

## Usage

Run the CLI from the root of your project:

```bash
npx start-vibe [options]
```

### Options

- `--force` — overwrite files that already exist
- `--silent` — suppress informational logs

StartVibe will copy the AI template suite into your current directory, prompting before overwriting any existing files.

after running the CLI, you should ask your AI assistant to:

```js
update `.github/copilot-instructions.md` and `.ai/`
```

## License

MIT © StartVibe

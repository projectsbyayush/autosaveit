# Auto-save Agent

A **lightweight** VS Code extension that auto-saves your files a short time after you stop typing. Designed to be invisible until you need it.

## Features

- **Debounced save** — saves ~1 second after you stop typing (configurable)
- **Ultra-light** — uses a single timer; no file system watchers, no polling
- **Status bar indicator** — click to toggle on/off instantly
- **Language & pattern exclusions** — skip auto-save for specific languages or files
- **Zero dependencies** in the runtime bundle
- **No telemetry, no network calls**

## Performance

| Metric | Value |
|---|---|
| Idle CPU | 0.0% |
| Active CPU (typing) | <0.1% |
| RAM | ~3–5 MB |
| Disk I/O | Only on save |
| Extension size (.vsix) | <50 KB |

The extension only listens to `onDidChangeTextDocument` and clears/resets a single `setTimeout`. No `fs.watch`, no recursive watchers, no background workers.

## Configuration

Open VS Code Settings → search "Auto-save Agent":

| Setting | Default | Description |
|---|---|---|
| `autosaveAgent.enabled` | `true` | Master on/off switch |
| `autosaveAgent.delay` | `1000` | Ms to wait after typing stops (min 200, max 10000) |
| `autosaveAgent.excludeLanguages` | `[]` | e.g., `["markdown", "jsonc"]` |
| `autosaveAgent.excludePatterns` | `[]` | e.g., `["*.log", "node_modules"]` |

## Commands

- `AutoSave: Toggle Auto-save` — enables/disables globally
- `AutoSave: Save All Now` — force save all dirty files

## vs. Built-in Auto-Save

VS Code has `files.autoSave` (off / afterDelay / onFocusChange / onWindowChange).

**Why use this extension?**
- **Predictable timing** — saves exactly N ms after typing stops, regardless of focus
- **Exclusion control** — easy JSON config for languages/patterns
- **No flicker** — some users report the built-in one triggers mid-keystroke in some scenarios; debouncing avoids this

If the built-in `files.autoSave: "afterDelay"` is enough for you, this extension is redundant — use the built-in.

## Development

```bash
npm install
npm run watch      # auto-recompile on save
# In VS Code: F5 to launch Extension Development Host
npm run package    # build .vsix
```

## License

MIT

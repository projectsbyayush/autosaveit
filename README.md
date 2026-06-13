# autosaveit — Auto Save Extension for VS Code

**autosaveit** is a lightweight, high-performance auto-save extension for Visual Studio Code that automatically saves your files after you stop typing. Built for developers who want reliable, non-intrusive auto-save without impacting performance.

## Why autosaveit?

Stop losing work. **autosaveit** automatically saves your files with a smart debounce timer — no configuration needed, no performance lag, no distractions. Perfect for developers who want the safety of auto-save without the overhead.

## Resources

- **GitHub:** https://github.com/projectsbyayush/autosaveit
- **Report Issues:** https://github.com/projectsbyayush/autosaveit/issues
- **License:** MIT

## Key Features

- **Smart Debounced Auto-Save** — Saves files automatically after typing stops (configurable delay, default 1 second)
- **Ultra-Lightweight** — Uses <0.1% CPU and <5MB RAM; no file watchers, no polling, no background processes
- **Status Bar Toggle** — Quick enable/disable with one click from the VS Code status bar
- **Language Exclusions** — Exclude specific languages like Markdown, JSONC from auto-save
- **File Pattern Exclusions** — Exclude files by pattern (e.g., `*.log`, `node_modules`)
- **Zero Dependencies** — No runtime dependencies, no network calls, no telemetry
- **Fully Configurable** — Adjust delay, exclusions, and behavior via VS Code settings

## Performance Benchmarks

| Metric | Value |
|---|---|
| Idle CPU Usage | 0.0% |
| Active CPU (typing) | <0.1% |
| Memory (RAM) | ~3–5 MB |
| Disk I/O | Only on save |
| Extension Size | <15 KB |

**Why so fast?** autosaveit uses a single `setTimeout` timer that resets on each keystroke. No `fs.watch`, no recursive directory watchers, no background workers. Just one event listener and one timer.

## Quick Start

1. **Install** — Search "autosaveit" in VS Code Extensions Marketplace
2. **Open** any file in VS Code
3. **Type** your code
4. **Stop typing** — file saves automatically after 1 second

That's it. No configuration required.

## How It Works

1. You type in any open file
2. autosaveit listens for document changes via `onDidChangeTextDocument`
3. After you stop typing, a debounce timer starts (default: 1000ms)
4. If you type again before the timer expires, the timer resets
5. When the timer completes, the file is saved automatically
6. Toggle on/off anytime via the status bar or command palette

## Commands

| Command | Description | How to Access |
|---------|-------------|---------------|
| **Toggle Auto-save** | Enable/disable auto-save globally | Click status bar icon or `Ctrl+Shift+P` → "Toggle Auto-save" |
| **Save All Now** | Force save all dirty files immediately | `Ctrl+Shift+P` → "Save All Now" |

## Configuration

Open VS Code Settings (`Ctrl+,`) and search for "autosaveit", or add to your `settings.json`:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `autosaveit.enabled` | boolean | `true` | Master on/off switch for auto-save |
| `autosaveit.delay` | number | `1000` | Milliseconds to wait after typing stops before saving (min: 200, max: 10000) |
| `autosaveit.excludeLanguages` | array | `[]` | Language IDs to exclude from auto-save (e.g., `["markdown", "jsonc"]`) |
| `autosaveit.excludePatterns` | array | `[]` | File glob patterns to exclude (e.g., `["*.log", "temp"]`) |

### Example Configuration

```json
{
  "autosaveit.enabled": true,
  "autosaveit.delay": 1500,
  "autosaveit.excludeLanguages": ["markdown", "jsonc"],
  "autosaveit.excludePatterns": ["*.log", "node_modules"]
}
```

## vs. VS Code Built-in Auto-Save

VS Code has `files.autoSave` with options: `off`, `afterDelay`, `onFocusChange`, `onWindowChange`.

**Why choose autosaveit?**

| Feature | autosaveit | VS Code Built-in |
|---------|------------|------------------|
| Save after typing stops | ✅ | ✅ (afterDelay) |
| Configurable delay | ✅ (200-10000ms) | ✅ (fixed) |
| Exclude by language | ✅ | ❌ |
| Exclude by file pattern | ✅ | ❌ |
| No focus change required | ✅ | ❌ (onFocusChange) |
| Lightweight (<15KB) | ✅ | N/A |
| Status bar toggle | ✅ | ❌ |

**Bottom line:** If you need language/pattern exclusions or predictable timing regardless of window focus, use autosaveit. If basic auto-save is enough, the built-in option works fine.

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Press `Ctrl+Shift+X` to open Extensions
3. Search for **"autosaveit"**
4. Click **Install**

### From VSIX

```bash
code --install-extension AyushPatil.autosaveit-1.0.0.vsix
```

### From Source

```bash
git clone https://github.com/projectsbyayush/autosaveit.git
cd autosaveit
npm install
npm run compile
```

## Requirements

- VS Code 1.60.0 or higher
- Node.js (for development only)

## Keywords

auto-save, autosave, vscode, visual studio code, extension, productivity, code editor, automatic save, debounced save, lightweight, performance, developer tools

## License

MIT License - Copyright (c) 2026 Ayush Patil.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on [GitHub](https://github.com/projectsbyayush/autosaveit).

## Support

If you find autosaveit helpful, please ⭐ star the repo on GitHub and rate it on the VS Code Marketplace.

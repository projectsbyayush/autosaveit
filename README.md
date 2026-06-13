# autosaveit

Lightweight debounced auto-save for VS Code. Saves files after you stop typing — invisible until you need it.

## Resources

- **GitHub:** https://github.com/projectsbyayush/autosaveit
- **Report Issues:** https://github.com/projectsbyayush/autosaveit/issues
- **License:** MIT

## Features

- **Debounced Save** — Saves ~1 second after you stop typing (configurable)
- **Ultra-Light** — Single timer, no file watchers, no polling
- **Status Bar Toggle** — Click to enable/disable instantly
- **Language Exclusions** — Skip auto-save for specific languages
- **Pattern Exclusions** — Skip auto-save for specific file patterns
- **Zero Dependencies** — No runtime dependencies
- **No Telemetry** — No network calls, no tracking

## Performance

| Metric | Value |
|---|---|
| Idle CPU | 0.0% |
| Active CPU (typing) | <0.1% |
| RAM | ~3–5 MB |
| Disk I/O | Only on save |
| Extension size | <15 KB |

## Quick Start

1. Install the extension from the VS Code Marketplace
2. Open any file in VS Code
3. Start typing
4. Stop typing — file saves automatically

## How It Works

1. Type in any file
2. Stop typing for the configured delay (default: 1000ms)
3. File saves automatically
4. Toggle on/off via status bar icon or command palette

## Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| Toggle Auto-save | Enable/disable auto-save globally | Click status bar |
| Save All Now | Force save all dirty files | `Ctrl+Shift+P` |

## Configuration

Open VS Code Settings → search "autosaveit":

| Setting | Default | Description |
|---------|---------|-------------|
| `autosaveit.enabled` | `true` | Master on/off switch |
| `autosaveit.delay` | `1000` | Milliseconds to wait after typing stops |
| `autosaveit.excludeLanguages` | `[]` | Language IDs to exclude |
| `autosaveit.excludePatterns` | `[]` | File patterns to exclude |

## vs. Built-in Auto-Save

VS Code has `files.autoSave` (off / afterDelay / onFocusChange / onWindowChange).

**Why use autosaveit?**
- **Predictable timing** — saves exactly N ms after typing stops
- **Exclusion control** — easy config for languages and patterns
- **No flicker** — debouncing avoids mid-keystroke saves

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "autosaveit"
4. Click Install

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

## License

MIT License - Copyright (c) 2026 Ayush Patil.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this extension helpful, please rate it on the VS Code Marketplace.

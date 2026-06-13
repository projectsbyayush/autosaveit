import * as vscode from 'vscode';

let saveTimer: NodeJS.Timeout | undefined;
let statusBarItem: vscode.StatusBarItem;
let isEnabled = true;

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('autosaveit');
  isEnabled = config.get('enabled', true);

  // Status bar indicator
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'autosaveit.toggle';
  updateStatusBar();
  statusBarItem.show();

  // Debounced auto-save on text change
  const changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
    if (!isEnabled) return;

    const cfg = vscode.workspace.getConfiguration('autosaveit');
    const delay = cfg.get<number>('delay', 1000);
    const excludeLangs = cfg.get<string[]>('excludeLanguages', []);
    const excludePatterns = cfg.get<string[]>('excludePatterns', []);

    const doc = event.document;
    if (doc.isDirty && !doc.isClosed) {
      // Skip excluded languages
      if (excludeLangs.includes(doc.languageId)) return;

      // Skip excluded file patterns
      if (excludePatterns.length > 0) {
        for (const pattern of excludePatterns) {
          if (doc.uri.fsPath.includes(pattern.replace(/\*/g, ''))) return;
        }
      }

      // Clear previous timer — debounce
      if (saveTimer) clearTimeout(saveTimer);

      saveTimer = setTimeout(() => {
        doc.save().then(undefined, () => {
          // Silent fail on save errors (e.g., read-only files)
        });
        saveTimer = undefined;
      }, delay);
    }
  });

  // Toggle command
  const toggleCmd = vscode.commands.registerCommand(
    'autosaveit.toggle',
    () => {
      isEnabled = !isEnabled;
      updateStatusBar();
      vscode.window.showInformationMessage(
        `Auto-save Agent: ${isEnabled ? 'Enabled' : 'Disabled'}`
      );
    }
  );

  // Save-all-now command
  const saveAllCmd = vscode.commands.registerCommand(
    'autosaveit.saveNow',
    () => {
      if (saveTimer) clearTimeout(saveTimer);
      vscode.workspace.saveAll(false);
    }
  );

  // React to config changes
  const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration('autosaveit')) {
      const cfg = vscode.workspace.getConfiguration('autosaveit');
      isEnabled = cfg.get('enabled', true);
      updateStatusBar();
    }
  });

  context.subscriptions.push(
    changeListener,
    toggleCmd,
    saveAllCmd,
    configListener,
    statusBarItem
  );
}

function updateStatusBar() {
  if (isEnabled) {
    statusBarItem.text = '$(save) Auto';
    statusBarItem.tooltip = 'Auto-save: ON — click to disable';
    statusBarItem.backgroundColor = undefined;
  } else {
    statusBarItem.text = '$(circle-slash) Auto';
    statusBarItem.tooltip = 'Auto-save: OFF — click to enable';
    statusBarItem.backgroundColor = new vscode.ThemeColor(
      'statusBarItem.warningBackground'
    );
  }
}

export function deactivate() {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = undefined;
  }
}

import * as vscode from "vscode";

export default class ExtensionProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "architect-extension.sidebar";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(data => {
      switch (data.type) {
        case "callCommand": {
          vscode.commands.executeCommand("architect-extension.start");
          break;
        }
        case "createFiles": {
          vscode.commands.executeCommand("architect-extension.createFiles");
          break;
        }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Colors</title>
			</head>
			<body>
				<ul class="color-list">
				</ul>
				<button id="button" class="add-color-button">Nuevo esquema</button>
        <button id="createFile" class="add-color-button">Nuevo archivo</button>
			</body>
      <script nonce="${nonce}">
      const vscode = acquireVsCodeApi();
      document.getElementById("button").addEventListener("click", () => {
        vscode.postMessage({ type: "callCommand" });
      })
      document.getElementById("createFile").addEventListener("click", () => {
        vscode.postMessage({ type: "createFiles" });
      })
      </script>
			</html>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

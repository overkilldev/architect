import * as path from "path";
import * as vscode from "vscode";

import { getNonce, messageReceivedHandler } from "../utils";

/**
 * Manages react webview panels
 */
export default class WebView {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: WebView | undefined;

  private static readonly viewType = "react";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionPath: string) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (WebView.currentPanel) {
      WebView.currentPanel._panel.reveal(column);
    } else {
      WebView.currentPanel = new WebView(
        extensionPath,
        column || vscode.ViewColumn.One
      );
    }
  }

  private constructor(extensionPath: string, column: vscode.ViewColumn) {
    this._extensionPath = extensionPath;

    this._panel = vscode.window.createWebviewPanel(
      WebView.viewType,
      "Architect",
      column,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restric the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.file(path.join(this._extensionPath, "../architect/build"))
        ]
      }
    );

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      messageReceivedHandler,
      null,
      this._disposables
    );
  }

  // TODO: remove, it stays here as an example of postMessage from the extension
  public doRefactor() {
    // Send a message to the webview webview.
    // You can send any JSON serializable data.
    this._panel.webview.postMessage({ command: "refactor" });
  }

  public dispose() {
    WebView.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getHtmlForWebview() {
    const assetsRoot = "../architect/build";
    const manifest = require(path.join(
      this._extensionPath,
      `${assetsRoot}/manifest.json`
    ));
    const mainScript = manifest["index.html"]["file"];
    const mainStyle = manifest["styles.css"];

    const scriptPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, assetsRoot, mainScript)
    );
    const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });

    const basePathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, assetsRoot)
    );
    const baseUri = basePathOnDisk.with({ scheme: "vscode-resource" });
    const stylePathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, assetsRoot, mainStyle)
    );
    const styleUri = stylePathOnDisk.with({ scheme: "vscode-resource" });

    // const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
    // const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();
    const nonceVsCodeScript = getNonce();

    return `<!DOCTYPE html>
    		<html lang="en">
    		<head>
    			<meta charset="utf-8">
    			<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    			<meta name="theme-color" content="#000000">
    			<title>React App</title>
    			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}' 'nonce-${nonceVsCodeScript}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
          <link rel="stylesheet" type="text/css" href="${styleUri}">
    			<base href="${baseUri}/">
    		</head>
    		<body>
    			<noscript>You need to enable JavaScript to run this app.</noscript>
    			<div id="root"></div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
          <script nonce="${nonceVsCodeScript}">
            window.isVsCode = true;
            window.acquireVsCodeApi = acquireVsCodeApi;
          </script>
    		</body>
    		</html>`;
  }
}

import * as path from "path";
import * as vscode from "vscode";

import MessagesProvider from "../MessagesProvider";
import { getNonce, messageReceivedHandler } from "../utils";

export default class SidebarView implements vscode.WebviewViewProvider {
  public static readonly viewType = "architect-extension.sidebar";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionPath: string) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [
        vscode.Uri.file(path.join(this._extensionPath, "../sidebar/build"))
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(message =>
      messageReceivedHandler(message)
    );

    MessagesProvider.register("sidebar", webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Use a nonce to only allow a specific script to be run.
    const assetsRoot = "../sidebar/build";
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

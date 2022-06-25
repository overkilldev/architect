import * as vscode from "vscode";

import SidebarView from "./views/sidebar";
import WebView from "./views/web";

export function activate(context: vscode.ExtensionContext) {
  const provider = new SidebarView(context.extensionPath);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(SidebarView.viewType, provider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("architect-extension.start", () => {
      WebView.createOrShow(context.extensionPath);
    })
  );
}

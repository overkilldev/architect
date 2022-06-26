import * as vscode from "vscode";

import { MessageTargets } from "@architect/types";

export default class MessagesProvider {
  public static provider: MessagesProvider;

  private static _views: Map<MessageTargets, vscode.Webview> = new Map();

  private constructor() {
    MessagesProvider.provider = new MessagesProvider();
  }

  public static register(viewName: MessageTargets, view: vscode.Webview) {
    MessagesProvider._views.set(viewName, view);
  }

  public static get views() {
    return MessagesProvider._views;
  }
}

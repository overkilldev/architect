import { Messages, MessageTargets } from "@architect/types";
import * as vscode from "vscode";

import MessagesProvider from "./MessagesProvider";

export const getNonce = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const messageReceivedHandler = (message: Messages) => {
  switch (message.command) {
    case "init": {
      vscode.commands.executeCommand("architect-extension.start");
      break;
    }
    case "alert": {
      vscode.window.showErrorMessage(message.text);
      break;
    }
    case "log": {
      const { command, forwardTo, ...rest } = message;
      console.log(rest);
      break;
    }
    default:
      console.error("Message not supported", message);
  }

  const views = MessagesProvider.views;

  // Forward message to every view
  if (message.forwardTo === "all") {
    views?.forEach(view => {
      view.postMessage(message);
    });
    return;
  }
  // Forward message to a single view
  const targetView = views.get(message.forwardTo ?? "none");
  targetView?.postMessage(message);
};

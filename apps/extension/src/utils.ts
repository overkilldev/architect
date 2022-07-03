import { Messages, MessageTargets } from "@architect/types";
import * as vscode from "vscode";
import * as fs from "fs-extra";
import * as path from "path";

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

export const messageReceivedHandler = async (message: Messages) => {
  let directoryPath = vscode.workspace.rootPath ?? "";

  if (!(await fs.stat(directoryPath)).isDirectory()) {
    directoryPath = path.dirname(directoryPath);
  }
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
    case "sync": {
      console.log(message);
      break;
    }
    case "generate": {
      const { data: nodes } = message;
      if (!directoryPath) {
        vscode.window.showErrorMessage("There is no directory created yet");
      }

      nodes?.map(node => {
        const { name, path: nodePath } = node;
        console.log(nodePath);
        const newPath = path.join(directoryPath, nodePath);
        fs.outputFile(newPath, name);
      });
      break;
    }
    // case "open": {
    //   console.log(message);
    //   break;
    // }
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

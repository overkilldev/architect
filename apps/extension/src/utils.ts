import { Messages } from "@architect/types";
import * as vscode from "vscode";

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
      const { command, ...rest } = message;
      console.log(rest);
      break;
    }
    default:
      console.error("Message not supported", message);
  }
};

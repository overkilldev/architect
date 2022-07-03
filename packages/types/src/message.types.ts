import { Account } from "./accounts.types";
import { Node } from "./trees.types";

export type MessageTargets = "web" | "sidebar" | "all" | "none";

export interface BaseMessage {
  command: string;
  source: "web" | "sidebar";
  forwardTo?: MessageTargets;
}

export interface InitMessage extends BaseMessage {
  command: "init";
}

export interface AlertMessage extends BaseMessage {
  command: "alert";
  text: string;
}

export interface LogMessage extends BaseMessage {
  command: "log";
  data: any;
}

export interface SyncMessage extends BaseMessage {
  command: "sync";
  data: Account;
}

export interface GenerateMessage extends BaseMessage {
  command: "generate";
  data: Node[];
}

export type Messages =
  | InitMessage
  | AlertMessage
  | LogMessage
  | SyncMessage
  | GenerateMessage;

export type MessageTargets = "web" | "sidebar" | "all" | "none";

export interface BaseMessage {
  command: string;
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
  source: "web" | "sidebar";
  data: any;
}

export type Messages = InitMessage | AlertMessage | LogMessage;

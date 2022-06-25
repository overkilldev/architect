export interface InitMessage {
  command: "init";
}

export interface AlertMessage {
  command: "alert";
  text: string;
}

export interface LogMessage {
  command: "log";
  source: "web" | "sidebar";
  data: any;
}

export type Messages = InitMessage | AlertMessage | LogMessage;

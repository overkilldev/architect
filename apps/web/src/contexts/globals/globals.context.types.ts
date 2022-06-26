// Interfaces and types from context Globals
import { Messages } from "@architect/types";

// Provider Props
export interface GlobalsProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface GlobalsProviderValue {
  vscode: ReturnType<Window<Messages>["acquireVsCodeApi"]> | null;
}

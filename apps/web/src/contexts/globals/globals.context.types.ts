// Interfaces and types from context Globals
import { Messages } from "@architect/types";
import { Dispatch, SetStateAction } from "react";

// Provider Props
export interface GlobalsProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface GlobalsProviderValue {
  vscode: ReturnType<Window<Messages>["acquireVsCodeApi"]> | null;
  nodeDrawer: NodeDrawerContext;
}

export type FormDrawerStates = "CREATE" | "EDIT";

export interface NodeDrawerContext {
  formMode: FormDrawerStates;
  setFormMode: Dispatch<SetStateAction<FormDrawerStates>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

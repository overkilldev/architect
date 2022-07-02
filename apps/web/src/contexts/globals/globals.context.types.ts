// Interfaces and types from context Globals
import { Messages } from "@architect/types";

// Provider Props
export interface GlobalsProviderProps {
  children: React.ReactNode;
}

// TODO: deberíamos mover al package types
export type VsCode = ReturnType<Window<Messages>["acquireVsCodeApi"]>;

// Provider value
export interface GlobalsProviderValue {
  setVsCode: (vscode: VsCode | null) => void;
  vscode: VsCode | null;
  nodeDrawer: NodeDrawerContext;
}

export type FormDrawerStates = "CREATE" | "EDIT";

export interface NodeDrawerContext {
  formMode: FormDrawerStates;
  setFormMode: (mode: FormDrawerStates) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

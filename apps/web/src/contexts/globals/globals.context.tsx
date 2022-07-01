import create from "zustand";

import { GlobalsProviderValue } from "./globals.context.types";

const useGlobals = create<GlobalsProviderValue>((set, get) => ({
  vscode: window.isVsCode ? window.acquireVsCodeApi() : null,
  nodeDrawer: {
    isOpen: false,
    onOpen: () => {
      set({ nodeDrawer: { ...get().nodeDrawer, isOpen: true } });
    },
    onClose: () => {
      set({ nodeDrawer: { ...get().nodeDrawer, isOpen: false } });
    },
    formMode: "CREATE",
    setFormMode: mode => {
      set({ nodeDrawer: { ...get().nodeDrawer, formMode: mode } });
    }
  }
}));

export default useGlobals;

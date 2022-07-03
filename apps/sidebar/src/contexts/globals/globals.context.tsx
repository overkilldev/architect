import create from "zustand";

import { GlobalsProviderValue } from "./globals.context.types";

const useGlobalsStore = create<GlobalsProviderValue>((set, get) => ({
  setVsCode: vscode => set({ vscode }),
  vscode: window.isVsCode ? window.acquireVsCodeApi() : null,
  setAccount: account => set({ account }),
  account: undefined
}));

export default useGlobalsStore;

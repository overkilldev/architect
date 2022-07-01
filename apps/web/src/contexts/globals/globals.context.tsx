import React from "react";
import create, { StoreApi } from "zustand";
import createContext from "zustand/context";

import { GlobalsProviderProps as Props } from "./globals.context.types";
import { GlobalsProviderValue } from "./globals.context.types";

type GlobalsStoreApi = StoreApi<GlobalsProviderValue>;
const { Provider, useStore: useGlobals } = createContext<GlobalsStoreApi>();

export const GlobalsProvider: React.FC<Props> = props => {
  const value = () => {
    return create<GlobalsProviderValue>((set, get) => ({
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
  };

  return <Provider createStore={value}>{props.children}</Provider>;
};

export default useGlobals;

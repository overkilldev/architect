import React, { createContext, useMemo } from "react";

import { GlobalsProviderProps as Props } from "./globals.context.types";
import { GlobalsProviderValue } from "./globals.context.types";

// @ts-ignore
export const GlobalsContext = createContext<GlobalsProviderValue>();

const GlobalsProvider: React.FC<Props> = props => {
  const vscode = useMemo(
    () => (window.isVsCode ? window.acquireVsCodeApi() : null),
    []
  );

  const value: GlobalsProviderValue = useMemo(() => {
    return {
      vscode
    };
  }, [vscode]);

  return (
    <GlobalsContext.Provider value={value}>
      {props.children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;

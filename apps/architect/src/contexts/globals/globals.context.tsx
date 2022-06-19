import React, { createContext, useMemo } from "react";

import { GlobalsProviderProps as Props } from "./globals.context.types";
import { GlobalsProviderValue } from "./globals.context.types";

// @ts-ignore
export const GlobalsContext = createContext<GlobalsProviderValue>();

const GlobalsProvider: React.FC<Props> = props => {
  const value: GlobalsProviderValue = useMemo(() => {
    return {};
  }, []);

  return (
    <GlobalsContext.Provider value={value}>
      {props.children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;

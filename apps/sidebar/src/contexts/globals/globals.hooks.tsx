import { useContext } from "react";

import { GlobalsContext } from "./globals.context";
import { GlobalsProviderValue } from "./globals.context.types";

const useGlobals = () => {
  const context = useContext<GlobalsProviderValue>(GlobalsContext);
  if (typeof context === "undefined") {
    throw new Error("useGlobals must be used within a GlobalsProvider");
  }
  return context;
};

export default useGlobals;

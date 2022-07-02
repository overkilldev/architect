import { useContext } from "react";

import { GlobalsContext } from "./globals.context";
import { GlobalsProviderValue } from "./globals.context.types";

const useGlobalsStore = () => {
  const context = useContext<GlobalsProviderValue>(GlobalsContext);
  if (typeof context === "undefined") {
    throw new Error("useGlobalsStore must be used within a GlobalsProvider");
  }
  return context;
};

export default useGlobalsStore;

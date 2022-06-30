import { useContext } from "react";

import { TreeContext } from "./tree.context";
import { TreeProviderValue } from "./tree.context.types";

const useTree = () => {
  const context = useContext<TreeProviderValue>(TreeContext);
  if (typeof context === "undefined") {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};

export default useTree;

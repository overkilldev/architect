import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useCallback, useMemo, useState } from "react";

import { FormDrawerStates, NodeDrawerContext } from "./globals.context.types";
import { GlobalsProviderProps as Props } from "./globals.context.types";
import { GlobalsProviderValue } from "./globals.context.types";
import useTree from "contexts/tree/tree.context";

// @ts-ignore
export const GlobalsContext = createContext<GlobalsProviderValue>();

const GlobalsProvider: React.FC<Props> = props => {
  const setSelectedNode = useTree(state => state.setSelectedNode);

  // START: node drawer props
  const nodeDrawerTemp = useDisclosure();
  const [nodeDrawerFormMode, setNodeDrawerFormMode] =
    useState<FormDrawerStates>("CREATE");
  const nodeDrawerCloseHandler = useCallback(() => {
    setSelectedNode(null);
    nodeDrawerTemp.onClose();
  }, [nodeDrawerTemp, setSelectedNode]);
  const nodeDrawer = useMemo<NodeDrawerContext>(() => {
    return {
      ...nodeDrawerTemp,
      formMode: nodeDrawerFormMode,
      setFormMode: setNodeDrawerFormMode,
      onClose: nodeDrawerCloseHandler
    };
  }, [nodeDrawerFormMode, nodeDrawerTemp, nodeDrawerCloseHandler]);
  // END: node drawer props

  const vscode = useMemo(
    () => (window.isVsCode ? window.acquireVsCodeApi() : null),
    []
  );

  const value: GlobalsProviderValue = useMemo(() => {
    return {
      vscode,
      nodeDrawer
    };
  }, [vscode, nodeDrawer]);

  return (
    <GlobalsContext.Provider value={value}>
      {props.children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;

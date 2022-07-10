import React from "react";

import { TreeFABProps as Props } from "./TreeFAB.types";
import FAB from "components/global/FAB/FAB";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const TreeFAB: React.FC<Props> = props => {
  const vscode = useGlobalsStore(state => state.vscode);
  const addTree = useTreeStore(state => state.addTree);
  const activeTreeId = useTreeStore(state => state.activeTreeId);
  const setActiveTreeId = useTreeStore(state => state.setActiveTreeId);
  const nodes = useTreeStore(state => state.nodes.get(activeTreeId)!);
  useFetchAccount();

  const generateClickHandler = () => {
    console.log("generating...");
    vscode?.postMessage({
      command: "generate",
      source: "web",
      data: nodes.map(n => {
        // @ts-ignore must be delete to avoid issues with circular dependencies
        delete n.data.node;
        return n;
      })
    });
  };

  const newTreeHandler = () => {
    const newTreeId = addTree();
    setActiveTreeId(newTreeId);
  };

  const itemClasses = "mb-4 mr-4";
  const itemTextClasses = "whitespace-nowrap";

  return (
    <FAB className="TreeFAB">
      <FAB.Item onClick={generateClickHandler} className={itemClasses}>
        <p className={itemTextClasses}>Generate file structure</p>
      </FAB.Item>
      <FAB.Item onClick={newTreeHandler} className={itemClasses}>
        <p className={itemTextClasses}>New tree</p>
      </FAB.Item>
    </FAB>
  );
};

TreeFAB.defaultProps = {};

export default TreeFAB;

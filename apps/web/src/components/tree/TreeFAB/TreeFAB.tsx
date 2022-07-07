import React from "react";

import { TreeFABProps as Props } from "./TreeFAB.types";
import FAB from "components/global/FAB/FAB";
import useGlobalsStore from "contexts/globals/globals.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const TreeFAB: React.FC<Props> = props => {
  const vscode = useGlobalsStore(state => state.vscode);
  const { data: accountResponse } = useFetchAccount();
  const { data: account } = accountResponse ?? {};

  const generateClickHandler = () => {
    console.log("generating...");
    vscode?.postMessage({
      command: "generate",
      source: "web",
      data: account?.trees[0].nodes ?? []
    });
  };

  const newTreeHandler = () => {
    console.log("New tree");
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

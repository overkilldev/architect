import { useCallback } from "react";

import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useGlobalsStore from "contexts/globals/globals.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const TreePage = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  const { data: accountResponse } = useFetchAccount();
  const { data: account } = accountResponse ?? {};

  const generateClickHandler = useCallback(() => {
    vscode?.postMessage({
      command: "generate",
      source: "web",
      data: account?.trees[0].nodes ?? []
    });
  }, [account?.trees, vscode]);

  return (
    <>
      <Button onClick={generateClickHandler}>Generate</Button>
      <Tree />
      <NodeDrawer />
    </>
  );
};

export default TreePage;

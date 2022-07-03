import { useCallback } from "react";

import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const TreePage = () => {
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const vscode = useGlobalsStore(state => state.vscode);
  const { data: accountResponse } = useFetchAccount();
  const { setFormMode, onOpen } = nodeDrawer;
  const { data: account } = accountResponse ?? {};

  const nodeClickHandler = useCallback(() => {
    setSelectedNode(null);
    setFormMode("CREATE");
    onOpen();
  }, [onOpen, setFormMode, setSelectedNode]);

  const generateClickHandler = useCallback(() => {
    vscode?.postMessage({
      command: "generate",
      source: "web",
      data: account?.trees[0].nodes ?? [],
      forwardTo: "none"
    });
  }, [account?.trees, vscode]);

  return (
    <>
      <Button onClick={nodeClickHandler}>Create node</Button>
      <Button onClick={generateClickHandler}>Generate</Button>
      <Tree />
      <NodeDrawer />
    </>
  );
};

export default TreePage;

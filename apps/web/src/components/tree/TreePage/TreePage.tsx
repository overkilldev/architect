import { TriangleDownIcon } from "@chakra-ui/icons";
import { useCallback } from "react";

import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { useFetchAccount } from "services/accounts/accounts.service.hooks";

const TreePage = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  const { data: accountResponse } = useFetchAccount();
  const { data: account } = accountResponse ?? {};
  const selectedNodeId = useTreeStore(state => state.selectedNode)?.id;

  const generateClickHandler = useCallback(() => {
    vscode?.postMessage({
      command: "generate",
      source: "web",
      data: account?.trees[0].nodes ?? []
    });
  }, [account?.trees, vscode]);

  return (
    <>
      <Tree />
      <NodeDrawer key={selectedNodeId} />
      <Button
        onClick={generateClickHandler}
        className="absolute bottom-8 right-8 z-10 w-16 h-16 ring-2 hover:ring-4 active:ring-1 rounded-full"
      >
        <TriangleDownIcon w={4} h={4} />
      </Button>
    </>
  );
};

export default TreePage;

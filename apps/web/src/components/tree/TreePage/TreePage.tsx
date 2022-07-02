import { useCallback } from "react";

import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";

const TreePage = () => {
  const vscode = useGlobalsStore(state => state.vscode);
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const { setFormMode, onOpen } = nodeDrawer;

  const nodeClickHandler = useCallback(() => {
    setSelectedNode(null);
    setFormMode("CREATE");
    onOpen();
  }, [onOpen, setFormMode, setSelectedNode]);

  return (
    <>
      <Button onClick={nodeClickHandler}>Create node</Button>
      <Button
        onClick={() => {
          vscode?.postMessage({
            command: "log",
            source: "web",
            data: 1,
            forwardTo: "all"
          });
        }}
      >
        Send message
      </Button>
      <Tree />
      <NodeDrawer />
    </>
  );
};

export default TreePage;

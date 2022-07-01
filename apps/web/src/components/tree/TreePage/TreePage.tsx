import { useCallback } from "react";

import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useGlobals from "contexts/globals/globals.hooks";
import useTree from "contexts/tree/tree.context";

const TreePage = () => {
  const { vscode, nodeDrawer } = useGlobals();
  const setSelectedNode = useTree(state => state.setSelectedNode);
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

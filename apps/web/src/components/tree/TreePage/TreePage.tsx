import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useReactFlow } from "react-flow-renderer";

import { CustomNodeData, INode } from "../CustomNode/CustomNode.types";
import Tree from "../Tree/Tree";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import { NodeFormMode } from "components/tree/NodeDrawer/NodeDrawer.types";
import useGlobals from "contexts/globals/globals.hooks";
import useTree from "contexts/tree/tree.hooks";

const TreePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getViewport } = useReactFlow();
  const [drawerMode, setDrawerMode] = useState<NodeFormMode>("CREATE");
  const { vscode } = useGlobals();
  const { selectedNode, setSelectedNode, setNodes, setEdges } = useTree();

  const closeHandler = useCallback(() => {
    onClose();
    setSelectedNode(null);
  }, [onClose, setSelectedNode]);

  const nodeClickHandler = useCallback(
    (node: INode | null, mode: NodeFormMode) => {
      setSelectedNode(node);
      setDrawerMode(mode);
      onOpen();
    },
    [onOpen, setSelectedNode]
  );

  const createNode = useCallback(
    (
      parentNode: INode | null,
      id: string,
      overrides: Partial<CustomNodeData> = {}
    ): INode => {
      const { x, y } = getViewport();
      const newNode: INode = {
        id,
        type: "customNode",
        data: {
          label: `Node ${id}`,
          setNodes,
          setEdges,
          createNode,
          onClick: nodeClickHandler,
          node: null,
          ...overrides
        },
        position: { x, y }
      };
      newNode.data.node = newNode;
      const { width, height } = parentNode ?? {};
      if (parentNode && width && height) {
        const { position } = parentNode;
        newNode.position = {
          x: position.x,
          y: position.y + height + 25
        };
      }
      return newNode;
    },
    [getViewport, setNodes, setEdges, nodeClickHandler]
  );

  return (
    <>
      <Button onClick={() => nodeClickHandler(null, "CREATE")}>
        Create node
      </Button>
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
      <NodeDrawer
        createNode={createNode}
        setNodes={setNodes}
        setEdges={setEdges}
        mode={drawerMode}
        isOpen={isOpen}
        onClose={closeHandler}
        selectedNode={selectedNode}
      />
    </>
  );
};

export default TreePage;

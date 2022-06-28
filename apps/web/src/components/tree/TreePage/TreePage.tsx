import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance, MiniMap } from "react-flow-renderer";
import { addEdge, Connection, useReactFlow } from "react-flow-renderer";
import { OnNodesChange, Controls } from "react-flow-renderer";

import CustomNode from "../CustomNode/CustomNode";
import { CustomNodeData, ICustomNode } from "../CustomNode/CustomNode.types";
import Button from "components/global/Button/Button";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import { NodeFormMode } from "components/tree/NodeDrawer/NodeDrawer.types";
import useGlobals from "contexts/globals/globals.hooks";
import { createGraphLayout } from "utils/elk.utils";
import "./TreePage.css";

const TreePage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formFitView, setFormFitView] = useState("on");
  const { fitView, getViewport } = useReactFlow();
  const [drawerMode, setDrawerMode] = useState<NodeFormMode>("CREATE");
  const [selectedNode, setSelectedNode] = useState<ICustomNode | null>(null);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const { vscode } = useGlobals();

  const onConnect = useCallback(
    (params: Connection) => {
      return setEdges(edges => addEdge({ ...params }, edges));
    },
    [setEdges]
  );

  const onInit = async (reactFlowInstance: ReactFlowInstance) => {
    try {
      const nodes = await createGraphLayout(
        reactFlowInstance.getNodes(),
        reactFlowInstance.getEdges()
      );
      setNodes(nodes);
      reactFlowInstance.fitView();
    } catch (error) {
      console.error(error);
    }
  };

  const closeHandler = useCallback(() => {
    onClose();
    setSelectedNode(null);
  }, [onClose]);

  const nodeClickHandler = useCallback(
    (node: ICustomNode | null, mode: NodeFormMode) => {
      setSelectedNode(node);
      setDrawerMode(mode);
      onOpen();
    },
    [onOpen]
  );

  const createNode = useCallback(
    (
      parentNode: ICustomNode | null,
      id: string,
      overrides: Partial<CustomNodeData> = {}
    ): ICustomNode => {
      const { x, y } = getViewport();
      const newNode: ICustomNode = {
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

  const nodesChangeHandler: OnNodesChange = useCallback(
    async nodeChanges => {
      onNodesChange(nodeChanges);
      if (nodeChanges[0].type === "dimensions") {
        const newNodes = await createGraphLayout(nodes, edges);
        setNodes(newNodes);
        if (formFitView !== "on") return;
        fitView({ duration: 1000 });
      }
    },
    [onNodesChange, nodes, edges, setNodes, formFitView, fitView]
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
      <label className="text-center">
        <input
          type="checkbox"
          onChange={e => setFormFitView(e.target.checked ? "on" : "off")}
          defaultChecked
          value={formFitView}
        />
        Fit view
      </label>
      <ReactFlow
        className="h-auto flex-1"
        defaultZoom={1}
        nodes={nodes}
        edges={edges}
        onNodesChange={nodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        snapToGrid
      >
        <Controls />
        <MiniMap className="TreePage__minimap" maskColor="rgb(63 63 70)" />
      </ReactFlow>
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

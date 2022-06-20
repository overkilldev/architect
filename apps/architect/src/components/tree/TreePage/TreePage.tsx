import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance } from "react-flow-renderer";
import { addEdge, Connection } from "react-flow-renderer";
import { OnNodesChange } from "react-flow-renderer";

import CustomNode from "../CustomNode/CustomNode";
import { CustomNodeData, ICustomNode } from "../CustomNode/CustomNode.types";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import { NodeFormMode } from "components/tree/NodeDrawer/NodeDrawer.types";
import { createGraphLayout } from "utils/elk.utils";

const TreePage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ICustomNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fitView, setFitView] = useState("on");
  const [drawerMode, setDrawerMode] = useState<NodeFormMode>("CREATE");
  const [selectedNode, setSelectedNode] = useState<ICustomNode | null>(null);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const canvas = useRef<ReactFlowInstance>();
  const nodesLengthRef = useRef(edges.length);

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
      canvas.current = reactFlowInstance;
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
      const newNode: ICustomNode = {
        id,
        type: "customNode",
        data: {
          label: `Node ${id}`,
          // @ts-ignore
          setNodes,
          setEdges,
          createNode,
          onClick: nodeClickHandler,
          ...overrides
        },
        position: { x: 0, y: 0 }
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
    [setNodes, setEdges, nodeClickHandler]
  );

  const nodesChangeHandler: OnNodesChange = useCallback(
    async nodeChanges => {
      onNodesChange(nodeChanges);
      if (nodesLengthRef.current !== nodes.length) {
        const newNodes = await createGraphLayout(nodes, edges);
        setNodes(newNodes);
        nodesLengthRef.current = nodes.length;
      }
      // TODO: mejorar
      setTimeout(() => {
        if (!canvas.current || fitView !== "on") return;
        canvas.current.fitView();
      }, 500);
    },
    [edges, nodes, setNodes, onNodesChange, fitView]
  );

  return (
    <>
      <button
        className="text-center"
        onClick={() => nodeClickHandler(null, "CREATE")}
      >
        Create node
      </button>
      <label className="text-center">
        <input
          type="checkbox"
          onChange={e => setFitView(e.target.checked ? "on" : "off")}
          defaultChecked
          value={fitView}
        />
        Fit view
      </label>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={nodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        defaultZoom={1.5}
        fitView
      />
      <NodeDrawer
        createNode={createNode}
        // @ts-ignore
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

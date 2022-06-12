import { Input, useDisclosure } from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance } from "react-flow-renderer";
import { addEdge, Connection } from "react-flow-renderer";
import { OnNodesChange } from "react-flow-renderer";

import { createGraphLayout } from "../../utils";
import CustomNode from "../CustomNode/CustomNode";
import { ICustomNode } from "../CustomNode/CustomNode.types";
import Drawer from "../Drawer/Drawer";

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ICustomNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const [fitView, setFitView] = useState("off");
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

  const nodeClickHandler = useCallback(
    (node: ICustomNode | null) => {
      if (!node) return;
      onOpen();
    },
    [onOpen]
  );

  const createNode = useCallback(
    (parentNode: ICustomNode | null, id: string): ICustomNode => {
      const newNode: ICustomNode = {
        id,
        type: "customNode",
        data: {
          label: `Node ${id}`,
          // @ts-ignore
          setNodes,
          setEdges,
          createNode,
          onClick: nodeClickHandler
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

  const addNodeHandler = useCallback(
    (node: ICustomNode | null) => {
      // @ts-ignore
      setNodes(prev => {
        const newNode = createNode(node, `${prev.length}`);
        if (node) {
          setEdges(prev =>
            addEdge(
              {
                id: `${node.id}-${newNode.id}`,
                source: node.id,
                target: newNode.id,
                sourceHandle: "a",
                targetHandle: "b"
              },
              prev
            )
          );
        }
        return [...prev, newNode];
      });
    },
    [createNode, setEdges, setNodes]
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
      <button onClick={() => addNodeHandler(null)}>Create node</button>
      <label>
        <input
          type="checkbox"
          onChange={e => {
            setFitView(e.target.checked ? "on" : "off");
          }}
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
        onNodeClick={(e, node) => nodeClickHandler(node)}
        snapToGrid={true}
        defaultZoom={1.5}
        fitView
        // attributionPosition="bottom-left"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        header="Create your account"
      >
        <Input placeholder="Type here..." />
      </Drawer>
    </>
  );
};

export default UpdateNode;

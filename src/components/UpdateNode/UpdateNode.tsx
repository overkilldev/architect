import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance } from "react-flow-renderer";
import { addEdge } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { createGraphLayout } from "../../utils";
import CustomNode from "../CustomNode/CustomNode";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "customNode",
    data: {
      label: "Node 0",
    },
    position: { x: 100, y: 0 },
  },
  {
    id: "1",
    type: "customNode",
    data: { label: "Node 1" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, markerEnd: true }, eds)),
    [setEdges]
  );

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    createGraphLayout(
      reactFlowInstance.getNodes(),
      reactFlowInstance.getEdges()
    )
      .then((els) => setNodes(els))
      .catch((err) => console.error(err));
    reactFlowInstance.fitView();
  };

  useEffect(() => {
    const createNode = (parentNode: Node, id: string) => {
      const { position } = parentNode;
      const newNode = {
        id,
        type: "customNode",
        data: {
          label: `Node ${id}`,
          onClick: () => {},
        },
        position: {
          // @ts-ignore
          x: position.x - parentNode.width / 2 + Math.random() / 1000,
          // @ts-ignore
          y: position.y - parentNode.height / 2,
        },
      };
      newNode.data.onClick = () => clickHandler(newNode);
      return newNode;
    };

    const clickHandler = (node: Node) => {
      console.log("clicked", { node });
      setNodes((prev) => [...prev, createNode(node, `${prev.length}`)]);
    };

    setNodes((nds) =>
      nds.map((node) => {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          onClick: () => clickHandler(node),
        };

        return node;
      })
    );
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      // style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      // connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      // snapGrid={snapGrid}
      defaultZoom={1.5}
      fitView
      attributionPosition="bottom-left"
    />
  );
};

export default UpdateNode;

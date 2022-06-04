import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { addEdge } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
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

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const clickHandler = () => {
          console.log("clicked", { node });
          const { position } = node;
          setNodes((prev) => [
            ...prev,
            {
              id: prev.length.toString(),
              type: "customNode",
              data: { label: `Node ${prev.length}`, onClick: clickHandler },
              position: { x: 100, y: position.y + 100 },
            },
          ]);
        };
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          onClick: clickHandler,
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
      // style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      // connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      // snapGrid={snapGrid}
      defaultZoom={1.5}
      fitView
      attributionPosition="bottom-left"
    >
      {/* <div className="updatenode__controls">
        <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

        <div className="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div> */}
    </ReactFlow>
  );
};

export default UpdateNode;

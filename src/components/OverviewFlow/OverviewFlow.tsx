import React from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { nodes as initialNodes } from "./OverviewFlow.helpers";
import { edges as initialEdges } from "./OverviewFlow.helpers";

// @ts-ignore
const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  // @ts-ignore
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // @ts-ignore
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <>
      <button
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        onClick={() =>
          setNodes((prev) => [
            ...prev,
            {
              id: "1",
              type: "input",
              data: {
                label: <>Hello world</>,
              },
              position: { x: 1000, y: 500 },
            },
          ])
        }
      >
        Add Nodes
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        onError={(e) => console.log(e)}
      >
        <MiniMap
          // @ts-ignore
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          // @ts-ignore
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default OverviewFlow;

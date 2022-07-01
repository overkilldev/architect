import React from "react";
import ReactFlow from "react-flow-renderer";
import { MiniMap } from "react-flow-renderer";
import { Controls } from "react-flow-renderer";

import "./Tree.css";
import { TreeProps as Props } from "./Tree.types";
import useTree from "contexts/tree/tree.context";

const Tree: React.FC<Props> = props => {
  const nodes = useTree(state => state.nodes);
  const edges = useTree(state => state.edges);
  const nodeTypes = useTree(state => state.nodeTypes);
  const onInit = useTree(state => state.onInit);
  const onNodesChange = useTree(state => state.onNodesChange);
  const onEdgesChange = useTree(state => state.onEdgesChange);
  const onConnect = useTree(state => state.onConnect);

  return (
    <ReactFlow
      className="h-auto flex-1"
      defaultZoom={1}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid
    >
      <Controls />
      <MiniMap className="TreePage__minimap" maskColor="rgb(63 63 70)" />
    </ReactFlow>
  );
};

Tree.defaultProps = {};

export default Tree;

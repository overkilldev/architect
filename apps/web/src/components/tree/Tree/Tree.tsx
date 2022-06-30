import React from "react";
import ReactFlow from "react-flow-renderer";
import { MiniMap } from "react-flow-renderer";
import { Controls } from "react-flow-renderer";

import "./Tree.css";
import { TreeProps as Props } from "./Tree.types";
import useTree from "contexts/tree/tree.hooks";

const Tree: React.FC<Props> = props => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useTree();
  const { onConnect, onInit, nodeTypes } = useTree();

  return (
    <ReactFlow
      className="h-auto flex-1"
      defaultZoom={1}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      nodeTypes={nodeTypes}
      snapToGrid
    >
      <Controls />
      <MiniMap className="TreePage__minimap" maskColor="rgb(63 63 70)" />
    </ReactFlow>
  );
};

Tree.defaultProps = {};

export default Tree;

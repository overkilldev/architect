import React from "react";
import ReactFlow from "react-flow-renderer";
// import { MiniMap } from "react-flow-renderer";
import { Controls } from "react-flow-renderer";

import "./Tree.css";
import { TreeProps as Props } from "./Tree.types";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const Tree: React.FC<Props> = props => {
  const nodes = useTreeStore(state => state.nodes);
  const edges = useTreeStore(state => state.edges);
  const nodeTypes = useTreeStore(state => state.nodeTypes);
  const onInit = useTreeStore(state => state.onInit);
  const onEdgesChange = useTreeStore(state => state.onEdgesChange);
  const onConnect = useTreeStore(state => state.onConnect);
  const { onNodesChange } = useTreeAPI();

  return (
    <ReactFlow
      className="h-auto flex-1"
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
      {/* <MiniMap className="TreePage__minimap" maskColor="rgb(63 63 70)" /> */}
    </ReactFlow>
  );
};

Tree.defaultProps = {};

export default Tree;

import React, { memo } from "react";
import ReactFlow from "react-flow-renderer";
// import { MiniMap } from "react-flow-renderer";
import { Controls } from "react-flow-renderer";

import "./Tree.css";
import { TreeProps as Props } from "./Tree.types";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const Tree: React.FC<Props> = props => {
  const { id } = props;
  const nodes = useTreeStore(state => state.nodes.get(id));
  const edges = useTreeStore(state => state.edges.get(id));
  const nodeTypes = useTreeStore(state => state.nodeTypes);
  const onInit = useTreeStore(state => state.onInit(id));
  const onEdgesChange = useTreeStore(state => state.onEdgesChange(id));
  const onConnect = useTreeStore(state => state.onConnect(id));
  const { onNodesChange } = useTreeAPI(id);

  return (
    <ReactFlow
      className="h-auto flex-1 bg-black"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid
      proOptions={
        // TODO: probablemente debemos pagar para que no nos molesten con esto, toca ver que dice su licencia
        import.meta.env.DEV
          ? {
              account: "paid-pro",
              hideAttribution: true
            }
          : undefined
      }
    >
      <Controls />
      {/* <MiniMap className="TreePage__minimap" maskColor="rgb(63 63 70)" /> */}
    </ReactFlow>
  );
};

Tree.defaultProps = {};

export default memo(Tree);

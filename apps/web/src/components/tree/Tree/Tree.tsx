import React, { memo } from "react";
import ReactFlow from "react-flow-renderer";
// import { MiniMap } from "react-flow-renderer";
import { Controls } from "react-flow-renderer";

import "./Tree.css";
import TreeFAB from "../TreeFAB/TreeFAB";
import { TreeProps as Props } from "./Tree.types";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const Tree: React.FC<Props> = props => {
  const { bg } = props;
  const selectedNodeId = useTreeStore(state => state.selectedNode)?.id;
  const nodes = useTreeStore(state => state.nodes);
  const edges = useTreeStore(state => state.edges);
  const nodeTypes = useTreeStore(state => state.nodeTypes);
  const onInit = useTreeStore(state => state.onInit);
  const onEdgesChange = useTreeStore(state => state.onEdgesChange);
  const onConnect = useTreeStore(state => state.onConnect);
  const { onNodesChange } = useTreeAPI();

  return (
    <div className="h-full w-full">
      <ReactFlow
        style={{ background: bg }}
        className="h-auto flex-1"
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
      <NodeDrawer key={selectedNodeId} />
      <TreeFAB />
    </div>
  );
};

Tree.defaultProps = {};

export default memo(Tree);

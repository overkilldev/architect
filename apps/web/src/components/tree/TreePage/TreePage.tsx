import { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";

import Tree from "../Tree/Tree";
import TreeFAB from "../TreeFAB/TreeFAB";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import CONSTANTS from "config/constants";
import useTreeStore from "contexts/tree/tree.context";

const { TABS_HEIGHT } = CONSTANTS.GENERAL;

const TreePage = () => {
  const [active, setActive] = useState("0");
  const trees = useTreeStore(state => state.trees);
  const getSelectedNode = useTreeStore(state => state.selectedNode);

  const dimensionsClasses = "flex flex-col flex-1 w-full";
  const dimensionsStyles = { height: `calc(100% - ${TABS_HEIGHT}px)` };

  return (
    <div className={dimensionsClasses}>
      <div className="flex h-[56px]">
        {trees.map(treeId => {
          return (
            <p
              key={treeId}
              onClick={() => setActive(treeId)}
              className={`p-4 cursor-pointer ${
                treeId === active ? "text-violet-500" : ""
              }`}
            >
              {parseInt(treeId) + 1}
            </p>
          );
        })}
      </div>
      <div style={dimensionsStyles} className={dimensionsClasses}>
        {trees.map(treeId => {
          const selectedNodeId = getSelectedNode.get(treeId)?.id;
          return (
            <div
              style={dimensionsStyles}
              className={`absolute ${dimensionsClasses} ${
                treeId === active ? "z-20 visible" : "z-10 invisible"
              }`}
              key={treeId}
            >
              <ReactFlowProvider>
                <Tree id={treeId} />
              </ReactFlowProvider>
              {treeId === active ? (
                <NodeDrawer key={selectedNodeId} treeId={treeId} />
              ) : null}
              <TreeFAB changeActiveTree={setActive} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreePage;

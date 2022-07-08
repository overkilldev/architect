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
  const selectedNodeId = useTreeStore(state =>
    state.selectedNode.get(active)
  )?.id;

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
            </div>
          );
        })}
      </div>
      <NodeDrawer key={`${active}|${selectedNodeId}`} treeId={active} />
      <TreeFAB changeActiveTree={setActive} treeId={active} />
    </div>
  );
};

export default TreePage;

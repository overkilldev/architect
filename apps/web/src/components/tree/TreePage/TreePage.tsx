import { ReactFlowProvider } from "react-flow-renderer";
import { Outlet, useLocation } from "react-router-dom";

import Tree from "../Tree/Tree";
import TreeFAB from "../TreeFAB/TreeFAB";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import CONSTANTS from "config/constants";
import useTreeStore from "contexts/tree/tree.context";

const { TABS_HEIGHT } = CONSTANTS.GENERAL;

const TreePage = () => {
  const { pathname } = useLocation();
  const activeTreeId = useTreeStore(state => state.activeTreeId);
  const setActiveTreeId = useTreeStore(state => state.setActiveTreeId);
  const treesIds = useTreeStore(state => state.treesIds);
  const selectedNode = useTreeStore(state =>
    state.selectedNode.get(activeTreeId)
  );
  const { id: selectedNodeId } = selectedNode ?? {};

  const dimensionsClasses = "flex flex-col flex-1 w-full h-full";
  const dimensionsStyles = {
    height: `calc(100% - ${TABS_HEIGHT}px)`,
    width: "calc(100% - var(--sidebar-width))"
  };

  const tabs = (
    <div className="flex h-[56px]">
      {treesIds.map((treeId, index) => {
        return (
          <p
            key={treeId}
            onClick={() => setActiveTreeId(treeId)}
            className={`p-4 cursor-pointer ${
              treeId === activeTreeId ? "text-violet-500" : ""
            }`}
          >
            {index + 1}
          </p>
        );
      })}
    </div>
  );

  return (
    <div className="relative flex flex-1 w-full h-full">
      <div className={`${dimensionsClasses} relative`}>
        {pathname === "/workspace" ? tabs : null}
        <div style={dimensionsStyles} className={dimensionsClasses}>
          {treesIds.map(treeId => {
            return (
              <div
                style={dimensionsStyles}
                className={`absolute ${dimensionsClasses} ${
                  treeId === activeTreeId ? "z-20 visible" : "z-10 invisible"
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
        <Outlet />
      </div>
      <NodeDrawer
        key={`${activeTreeId}|${selectedNodeId}`}
        treeId={activeTreeId}
      />
      <TreeFAB />
    </div>
  );
};

export default TreePage;

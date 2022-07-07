import Tree from "../Tree/Tree";
import TreeFAB from "../TreeFAB/TreeFAB";
import NodeDrawer from "components/tree/NodeDrawer/NodeDrawer";
import useTreeStore from "contexts/tree/tree.context";

const TreePage = () => {
  const selectedNodeId = useTreeStore(state => state.selectedNode)?.id;

  return (
    <>
      <Tree />
      <NodeDrawer key={selectedNodeId} />
      <TreeFAB />
    </>
  );
};

export default TreePage;

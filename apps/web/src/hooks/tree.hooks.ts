import { useCallback, useMemo } from "react";
import { OnNodesChange, useReactFlow } from "react-flow-renderer";

import CONSTANTS from "config/constants";
import useTreeStore from "contexts/tree/tree.context";

const { NODE_WIDTH, NODE_HEIGHT } = CONSTANTS.GENERAL;

const useTreeAPI = (treeId: string) => {
  const { setCenter } = useReactFlow();
  const onNodesChangeStore = useTreeStore(state => state.onNodesChange(treeId));

  const centerOnNode = useCallback(
    (x: number, y: number) => {
      setCenter(x + NODE_WIDTH / 2, y + NODE_HEIGHT / 2, {
        duration: 1000,
        zoom: 1.5
      });
    },
    [setCenter]
  );

  const onNodesChange: OnNodesChange = useCallback(
    async changes => {
      const firstChange = changes[0];
      const nodes = await onNodesChangeStore(changes);
      if (firstChange.type !== "dimensions") return;
      const newNode = nodes.find(item => item.id === firstChange.id);
      if (!newNode) throw new Error("Unexpected not found node");
      const { x, y } = newNode.position;
      centerOnNode(x, y);
    },
    [centerOnNode, onNodesChangeStore]
  );

  return useMemo(() => {
    return {
      centerOnNode,
      onNodesChange
    };
  }, [centerOnNode, onNodesChange]);
};

export default useTreeAPI;

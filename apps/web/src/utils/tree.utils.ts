import { Node } from "@architect/types";

import { BaseNode } from "../components/tree/BaseNode/BaseNode.types";

export const transformNodesToBaseNodes = (
  nodes: Node[] | undefined
): BaseNode[] | undefined => {
  return nodes?.map(node => {
    // @ts-ignore Node does not contain data.node but BaseNode does.
    node.data.node = node;
    return node as BaseNode;
  });
};

// Interfaces and types from component RootNode
import { BaseNodeData } from "@architect/types";
import { Node } from "react-flow-renderer";

import { BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface RootNodeProps extends BaseNodeProps<RootNodeData> {}

export interface RootNodeData extends BaseNodeData<RootNode> {
  parentId: undefined;
}

export type RootNode = Node<RootNodeData>;

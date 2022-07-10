// Interfaces and types from component RootNode
import { Node } from "react-flow-renderer";

import { BaseNodeData, BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface RootNodeProps extends BaseNodeProps<RootNodeData> {}

export interface RootNodeData extends BaseNodeData {
  parentId: undefined;
}

export type RootNode = Node<RootNodeData>;

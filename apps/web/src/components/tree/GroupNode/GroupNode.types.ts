// Interfaces and types from component GroupNode
import { Node } from "react-flow-renderer";

import { BaseNodeData, BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface GroupNodeProps
  extends Omit<BaseNodeProps<GroupNodeData>, "handlesTypes"> {}

export interface GroupNodeData extends BaseNodeData {
  parentId: undefined;
}

export type GroupNode = Node<GroupNodeData>;

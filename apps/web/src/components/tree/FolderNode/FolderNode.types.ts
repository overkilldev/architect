// Interfaces and types from component FolderNode
import { Node } from "react-flow-renderer";

import { BaseNodeProps } from "../BaseNode/BaseNode.types";
import { BaseNodeData } from "components/tree/BaseNode/BaseNode.types";

// Component Props
export interface FolderNodeProps
  extends Omit<BaseNodeProps<FolderNodeData>, "handlesTypes"> {}

export interface FolderNodeData extends BaseNodeData {
  parentId: undefined;
}

export type FolderNode = Node<FolderNodeData>;

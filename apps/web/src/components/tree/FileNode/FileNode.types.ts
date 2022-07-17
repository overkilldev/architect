// Interfaces and types from component FileNode
import { Node } from "react-flow-renderer";

import { BaseNodeData, BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface FileNodeProps
  extends Omit<BaseNodeProps<FileNodeData>, "handlesTypes"> {}

export interface FileNodeData extends BaseNodeData {
  parentId: undefined;
}

export type FileNode = Node<FileNodeData>;

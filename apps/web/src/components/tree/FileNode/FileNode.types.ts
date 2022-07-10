// Interfaces and types from component FileNode
import { BaseNodeData } from "@architect/types";
import { Node } from "react-flow-renderer";

import { BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface FileNodeProps
  extends Omit<BaseNodeProps<FileNodeData>, "handlesType"> {}

export interface FileNodeData extends BaseNodeData<FileNode> {}

export type FileNode = Node<FileNodeData>;

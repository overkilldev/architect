// Interfaces and types from component FolderNode
import { BaseNodeData } from "@architect/types";
import { Node } from "react-flow-renderer";

import { BaseNodeProps } from "../BaseNode/BaseNode.types";

// Component Props
export interface FolderNodeProps
  extends Omit<BaseNodeProps<FolderNodeData>, "handlesType"> {}

export interface FolderNodeData extends BaseNodeData<FolderNode> {}

export type FolderNode = Node<FolderNodeData>;

// Interfaces and types from component BaseNode
import { NodeData, Node } from "@architect/types";
import { ReactNode } from "react";
import { NodeProps } from "react-flow-renderer";

export interface BaseNodeComponentProps<T extends BaseNodeData = BaseNodeData>
  extends BaseNodeProps<T> {
  children: ReactNode;
  handlesType?: "default" | "input" | "output" | "group";
}

// Component Props
export interface BaseNodeProps<T extends BaseNodeData = BaseNodeData>
  extends NodeProps<T> {}

export interface BaseNode<T extends BaseNodeData = BaseNodeData>
  extends Node<T> {}

export interface BaseNodeData extends NodeData {
  node: BaseNode;
}

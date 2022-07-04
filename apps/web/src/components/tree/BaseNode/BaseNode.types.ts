// Interfaces and types from component BaseNode
import { ReactNode } from "react";
import { Node, NodeProps } from "react-flow-renderer";

export interface BaseNodeComponentProps extends BaseNodeProps {
  children: ReactNode;
  handlesType?: "default" | "input" | "output" | "group";
}

// Component Props
export interface BaseNodeProps<T extends BaseNodeData = BaseNodeData>
  extends NodeProps<T> {}

export interface BaseNodeData<T extends BaseNode = BaseNode> {
  label: string;
  node: T;
  parentId: BaseNode["id"] | undefined;
}

export type BaseNode = Node<BaseNodeData>;

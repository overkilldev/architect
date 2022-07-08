// Interfaces and types from component BaseNode
import { BaseNodeData } from "@architect/types";
import { ReactNode } from "react";
import { NodeProps } from "react-flow-renderer";

export interface BaseNodeComponentProps extends BaseNodeProps {
  children: ReactNode;
  handlesType?: "default" | "input" | "output" | "group";
}

// Component Props
export interface BaseNodeProps<T extends BaseNodeData = BaseNodeData>
  extends NodeProps<T> {}

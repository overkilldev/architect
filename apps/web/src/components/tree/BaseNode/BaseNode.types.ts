// Interfaces and types from component BaseNode
import { BaseNodeData } from "@architect/types";
import { HTMLAttributes, ReactNode } from "react";
import { NodeProps } from "react-flow-renderer";

export interface BaseNodeComponentProps<T extends BaseNodeData = BaseNodeData>
  extends BaseNodeProps<T> {
  className?: string;
  children: ReactNode;
  handlesType?: "default" | "input" | "output" | "group";
}

// Component Props
export interface BaseNodeProps<T extends BaseNodeData = BaseNodeData>
  extends NodeProps<T>,
    Omit<HTMLAttributes<HTMLDivElement>, "id"> {}

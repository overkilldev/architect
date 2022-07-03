import { Node, NodeProps } from "react-flow-renderer";

export interface CustomNodeData {
  label: string;
  node: INode | null;
  parentId: INode["id"] | undefined;
}

export interface CustomNodeProps extends NodeProps<CustomNodeData> {}

export type INode = Node<CustomNodeData>;

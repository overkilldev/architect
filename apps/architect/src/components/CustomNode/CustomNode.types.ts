import { Dispatch, SetStateAction } from "react";
import { Edge, Node, NodeProps } from "react-flow-renderer";

export interface CustomNodeData {
  onClick: (node: ICustomNode | null) => void;
  label: string;
  setNodes: Dispatch<SetStateAction<ICustomNode[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  createNode: (parentNode: ICustomNode | null, id: string) => ICustomNode;
  node: ICustomNode | null;
}

export type ICustomNode = Node<CustomNodeData>;

export interface CustomNodeProps extends NodeProps<CustomNodeData> {}

import { Dispatch, SetStateAction } from "react";
import { Edge, Node, NodeProps } from "react-flow-renderer";

export interface CustomNodeData {
  label: string;
  setNodes: Dispatch<SetStateAction<INode[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  createNode: (
    parentNode: INode | null,
    id: string,
    overrides?: Partial<CustomNodeData>
  ) => INode;
  node: INode | null;
}

export interface CustomNodeProps extends NodeProps<CustomNodeData> {}

export type INode = Node<CustomNodeData>;

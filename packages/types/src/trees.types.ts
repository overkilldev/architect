import { Edge, Node as RFNode } from "react-flow-renderer";

export interface Tree {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NodeData {
  pathname: string;
  absolutePathname: string | undefined;
  alias?: string | undefined;
  description?: string;
  rawContent?: string;
  content?: string;
  parentId: Node["id"] | undefined;
  treeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Node<T extends NodeData = NodeData> extends RFNode<T> {}

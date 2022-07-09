import { Node } from "react-flow-renderer";

export interface Tree {
  id: string;
  name: string;
  nodes: Node[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BaseNodeData<T extends BaseNode = BaseNode> {
  pathname: string;
  absolutePathname: string | undefined;
  alias?: string | undefined;
  description?: string;
  rawContent?: string;
  content?: string;
  node: T;
  parentId: BaseNode["id"] | undefined;
  treeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type BaseNode = Node<BaseNodeData>;

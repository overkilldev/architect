import { Node } from "react-flow-renderer";

import { EnhancedTemplate } from "./enhancedTemplates.types";

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
  enhancedTemplateId: EnhancedTemplate["id"] | null;
  node: T;
  parentId: BaseNode["id"] | undefined;
  treeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type BaseNode = Node<BaseNodeData>;

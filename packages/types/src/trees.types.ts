import { EnhancedTemplate } from "./enhancedTemplates.types";

export interface Tree {
  id: string;
  name: string;
  nodes: Node[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Node {
  id: string;
  name: string;
  enhancedTemplateId: EnhancedTemplate["id"] | null;
  path: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

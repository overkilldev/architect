export interface Node {
  id: string;
  name: string;
  enhancedTemplateId: EnhancedTemplate["id"] | null;
  path: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Enhancer {
  id: string;
  name: string;
  snippets: Snippet[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Snippet {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EnhancedTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  enhancersIds: Enhancer["id"][];
  templateId: Template["id"];
}

export interface Tree {
  id: string;
  name: string;
  nodes: Node[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Project {
  id: string;
  name: string;
  trees: Tree[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Account {
  id: string;
  name: string;
  lastName: string;
  email: string;
  projects: Project[];
  enhancers: Enhancer[];
  templates: Template[];
  enhancedTemplates: EnhancedTemplate[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

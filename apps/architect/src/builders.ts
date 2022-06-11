import faker from "faker";

import { Account, EnhancedTemplate, Enhancer, Node } from "./types";
import { Project, Snippet, Template, Tree } from "./types";

export const buildNode = (overrides: Partial<Node> = {}): Node => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    enhancedTemplateId: faker.random.word(),
    path: "/",
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genNodes = (quantity?: number): Node[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const nodes = [];
  for (let i = 0; i < num; i++) {
    const node = buildNode();
    nodes.push(node);
  }
  return nodes;
};

export const buildTemplate = (overrides: Partial<Template> = {}): Template => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genTemplates = (quantity?: number): Template[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const templates = [];
  for (let i = 0; i < num; i++) {
    const template = buildTemplate();
    templates.push(template);
  }
  return templates;
};

export const buildEnhancer = (overrides: Partial<Enhancer> = {}): Enhancer => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    snippets: genSnippets(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genEnhancers = (quantity?: number): Enhancer[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const enhancers = [];
  for (let i = 0; i < num; i++) {
    const enhancer = buildEnhancer();
    enhancers.push(enhancer);
  }
  return enhancers;
};

export const buildSnippet = (overrides: Partial<Snippet> = {}): Snippet => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genSnippets = (quantity?: number): Snippet[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const snippets = [];
  for (let i = 0; i < num; i++) {
    const snippet = buildSnippet();
    snippets.push(snippet);
  }
  return snippets;
};

export const buildEnhancedTemplate = (
  overrides: Partial<EnhancedTemplate> = {}
): EnhancedTemplate => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    content: faker.random.word(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    enhancersIds: [faker.random.word(), faker.random.word()], // TODO: add enhancers id
    templateId: faker.random.word(), // TODO: add template id
    ...overrides
  };
};

export const genEnhancedTemplates = (quantity?: number): EnhancedTemplate[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const enhancedTemplates = [];
  for (let i = 0; i < num; i++) {
    const enhancedTemplate = buildEnhancedTemplate();
    enhancedTemplates.push(enhancedTemplate);
  }
  return enhancedTemplates;
};

export const buildTree = (overrides: Partial<Tree> = {}): Tree => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    nodes: genNodes(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genTrees = (quantity?: number): Tree[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const trees = [];
  for (let i = 0; i < num; i++) {
    const tree = buildTree();
    trees.push(tree);
  }
  return trees;
};

export const buildProject = (overrides: Partial<Project> = {}): Project => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    trees: genTrees(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

export const genProjects = (quantity?: number): Project[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const projects = [];
  for (let i = 0; i < num; i++) {
    const project = buildProject();
    projects.push(project);
  }
  return projects;
};

export const buildAccount = (overrides: Partial<Account> = {}): Account => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    projects: genProjects(),
    templates: genTemplates(),
    enhancers: genEnhancers(),
    enhancedTemplates: genEnhancedTemplates(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    deletedAt: null,
    ...overrides
  };
};

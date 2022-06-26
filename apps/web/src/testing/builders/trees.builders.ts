import faker from "faker";

import { Node, Tree } from "types/trees.types";

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

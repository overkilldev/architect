import { Node, Tree } from "@architect/types";
import faker from "faker";

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

const nodeOne = buildNode({ path: "src/containers/App.tsx" });
const nodeTwo = buildNode({ path: "src/types/product.types.ts" });
const nodeThree = buildNode({ path: "src/component/global/ProductCard.tsx" });

const nodes = [nodeOne, nodeTwo, nodeThree];

export const buildTree = (overrides: Partial<Tree> = {}): Tree => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    nodes,
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

import { BaseNode, BaseNodeData, Tree } from "@architect/types";
import faker from "faker";

export const buildNode = (
  dataOverrides: Partial<BaseNodeData> = {},
  overrides: Partial<BaseNode> = {}
): BaseNode => {
  const partialNode = {
    id: faker.datatype.uuid(),
    position: { x: 0, y: 0 },
    data: {
      alias: faker.random.word(),
      enhancedTemplateId: faker.random.word(),
      pathname: "/",
      absolutePathname: "/",
      parentId: undefined,
      treeId: "0",
      node: null as any,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      deletedAt: null,
      ...dataOverrides
    },
    ...overrides
  };
  partialNode.data.node = partialNode;
  return partialNode;
};

export const genNodes = (quantity?: number): BaseNode[] => {
  const num = quantity ?? Math.floor(Math.random() * 9) + 1;

  const nodes = [];
  for (let i = 0; i < num; i++) {
    const node = buildNode();
    nodes.push(node);
  }
  return nodes;
};

const nodeOne = buildNode({ absolutePathname: "src/containers/App.tsx" });
const nodeTwo = buildNode({ absolutePathname: "src/types/product.types.ts" });
const nodeThree = buildNode({
  absolutePathname: "src/component/global/ProductCard.tsx"
});

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

// Accounts services mock data

import { AccountResponse } from "./accounts.service.types";
import { buildAccount } from "testing/builders/accounts.builders";
import { buildResponse } from "testing/builders/services.builders";
import { buildEdge, buildNode } from "testing/builders/trees.builders";
import { buildTree } from "testing/builders/trees.builders";

const defaultTree = buildTree({ name: "Component" });

const folder = buildNode(
  {
    pathname: "./",
    absolutePathname: ".",
    treeId: defaultTree.id
  },
  {
    type: "rootNode"
  }
);

const component = buildNode(
  {
    pathname: "component.tsx",
    absolutePathname: "./component.tsx",
    treeId: defaultTree.id,
    alias: "// Component",
    parentId: folder.id
  },
  {
    type: "fileNode"
  }
);

const test = buildNode(
  {
    pathname: "component.test.ts",
    absolutePathname: "./component.test.ts",
    treeId: defaultTree.id,
    alias: "// Component test",
    parentId: folder.id
  },
  {
    type: "fileNode"
  }
);

const types = buildNode(
  {
    pathname: "component.types.ts",
    absolutePathname: "./component.types.ts",
    treeId: defaultTree.id,
    alias: "// Component types",
    parentId: folder.id
  },
  {
    type: "fileNode"
  }
);

const styles = buildNode(
  {
    pathname: "component.css",
    absolutePathname: "./component.css",
    treeId: defaultTree.id,
    alias: "/* Component styles */",
    parentId: folder.id
  },
  {
    type: "fileNode"
  }
);

defaultTree.nodes = [folder, component, test, types, styles];

const componentEdge = buildEdge({
  id: `${folder.id}-${component.id}`,
  source: folder.id,
  target: component.id,
  sourceHandle: "a",
  targetHandle: "b"
});

const testEdge = buildEdge({
  id: `${folder.id}-${test.id}`,
  source: folder.id,
  target: test.id,
  sourceHandle: "a",
  targetHandle: "b"
});

const typesEdge = buildEdge({
  id: `${folder.id}-${types.id}`,
  source: folder.id,
  target: types.id,
  sourceHandle: "a",
  targetHandle: "b"
});

const stylesEdge = buildEdge({
  id: `${folder.id}-${styles.id}`,
  source: folder.id,
  target: styles.id,
  sourceHandle: "a",
  targetHandle: "b"
});

defaultTree.edges = [componentEdge, testEdge, typesEdge, stylesEdge];

const mockedAccount = buildAccount({ trees: [defaultTree] });

export const mockedAccountResponse: AccountResponse = buildResponse({
  data: mockedAccount
});

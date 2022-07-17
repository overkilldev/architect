// Accounts services mock data
import { Template } from "@architect/types";

import { AccountResponse, TemplateResponse } from "./accounts.service.types";
import { buildAccount } from "testing/builders/accounts.builders";
import { buildResponse } from "testing/builders/services.builders";
import { buildTemplate } from "testing/builders/templates.builders";
import { buildEdge, buildNode } from "testing/builders/trees.builders";
import { buildTree } from "testing/builders/trees.builders";

const defaultTree = buildTree({ name: "Component" });

const componentTemplate = buildTemplate({
  name: "Component",
  content: `import React from "react";

const Component: React.FC<any> = props => {
  return <div>Component</div>;
};

Component.defaultProps = {};

export default Component;

  `
});

const typesTemplate = buildTemplate({
  name: "Component types",
  content: `// Component types and interfaces

export interface ComponentProps {
  className?: string;
}

`
});

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
    content: componentTemplate.content,
    alias: "Markup",
    parentId: folder.id,
    starterId: componentTemplate.id
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
    content: "// Component test",
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
    content: typesTemplate.content,
    parentId: folder.id,
    starterId: typesTemplate.id
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
    content: "/* Component styles */",
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

const runtimeTemplates: Template[] = [];

const mockedAccount = () => {
  return buildAccount({
    trees: [defaultTree],
    templates: [componentTemplate, typesTemplate, ...runtimeTemplates]
  });
};

export const mockedAccountResponse = (): AccountResponse => {
  return buildResponse({
    data: mockedAccount()
  });
};

export const mockedTemplateResponse = (
  overrides: Partial<Template> = {}
): TemplateResponse => {
  const newTemplate = buildTemplate(overrides);
  runtimeTemplates.push(newTemplate);
  return buildResponse({ data: newTemplate });
};

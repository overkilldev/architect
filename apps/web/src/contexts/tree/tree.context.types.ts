// Interfaces and types from context Tree
import { Tree } from "@architect/types";
import { FC } from "react";
import { Edge, NodeChange, NodeProps, OnInit } from "react-flow-renderer";
import { OnConnect, OnEdgesChange } from "react-flow-renderer";

import { ContentOption } from "components/global/ContentAutocomplete/ContentAutocomplete.types";
import { BaseNode } from "components/tree/BaseNode/BaseNode.types";
import { DefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";

// Provider Props
export interface TreeProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface TreeProviderValue {
  activeTreeId: Tree["id"];
  setActiveTreeId: (treeId: Tree["id"]) => void;
  treesIds: Tree["id"][];
  addTree: (tree?: Tree) => Tree["id"];
  nodes: Map<string, BaseNode[]>;
  setNodes: (treeId: Tree["id"]) => (nodes: BaseNode[]) => void;
  edges: Map<string, Edge[]>;
  setEdges: (treeId: Tree["id"]) => (edges: Edge[]) => void;
  selectedNode: Map<string, BaseNode | null>;
  setSelectedNode: (
    treeId: Tree["id"]
  ) => (selectedNode: BaseNode | null) => void;
  nodeTypes: NodeTypes;
  onInit: (treeId: Tree["id"]) => OnInit;
  onNodesChange: (
    treeId: Tree["id"]
  ) => (nodes: NodeChange[]) => Promise<BaseNode[]>;
  onEdgesChange: (treeId: Tree["id"]) => OnEdgesChange;
  onConnect: (treeId: Tree["id"]) => OnConnect;
  createNode: (
    data?: Partial<DefaultNodeData>,
    type?: NodeTypeName
  ) => BaseNode;
  getParentNode: (
    treeId: Tree["id"]
  ) => (node: BaseNode) => BaseNode | undefined;
  getChildren: (treeId: Tree["id"]) => (node: BaseNode) => BaseNode[];
  getConnectedEdges: (treeId: Tree["id"]) => (node: BaseNode) => Edge[];
  addNode: (
    treeId: Tree["id"]
  ) => (
    nodeData: AddNodeData,
    parentNode: BaseNode,
    type?: NodeTypeName
  ) => BaseNode;
  updateNode: (
    treeId: Tree["id"]
  ) => (
    node: BaseNode,
    data: Partial<DefaultNodeData>,
    type?: NodeTypeName
  ) => void;
  deleteNode: (treeId: Tree["id"]) => (node: DefaultNode) => void;
  addSubTree: (
    treeId: Tree["id"]
  ) => (subTreeId: Tree, parentNode: BaseNode, data: TreeData) => void;
}

export interface TreeData extends AddNodeData {
  starterLabel: ContentOption["label"];
}

export interface AddNodeData
  extends Omit<
    DefaultNodeData,
    | "node"
    | "parentId"
    | "absolutePathname"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export type NodeTypeName =
  | "defaultNode"
  | "rootNode"
  | "folderNode"
  | "fileNode"
  | "groupNode";

export type NodeTypes = Record<NodeTypeName, FC<NodeProps>>;

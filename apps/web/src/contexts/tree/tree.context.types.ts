// Interfaces and types from context Tree
import { BaseNode } from "@architect/types";
import { Edge, NodeChange, OnInit } from "react-flow-renderer";
import { NodeTypes, OnConnect, OnEdgesChange } from "react-flow-renderer";

import { DefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";

// Provider Props
export interface TreeProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface TreeProviderValue {
  trees: string[];
  addTree: () => string;
  nodes: Map<string, BaseNode[]>;
  setNodes: (treeId: string) => (nodes: BaseNode[]) => void;
  edges: Map<string, Edge[]>;
  setEdges: (treeId: string) => (edges: Edge[]) => void;
  selectedNode: Map<string, BaseNode | null>;
  setSelectedNode: (treeId: string) => (selectedNode: BaseNode | null) => void;
  nodeTypes: NodeTypes;
  onInit: (treeId: string) => OnInit;
  onNodesChange: (
    treeId: string
  ) => (nodes: NodeChange[]) => Promise<BaseNode[]>;
  onEdgesChange: (treeId: string) => OnEdgesChange;
  onConnect: (treeId: string) => OnConnect;
  createNode: (
    data?: Partial<DefaultNodeData>,
    type?: "defaultNode" | "rootNode"
  ) => BaseNode;
  getParentNode: (treeId: string) => (node: BaseNode) => BaseNode | undefined;
  getChildren: (treeId: string) => (node: BaseNode) => BaseNode[];
  getConnectedEdges: (treeId: string) => (node: BaseNode) => Edge[];
  addNode: (
    treeId: string
  ) => (nodeData: AddNodeData, parentNode: BaseNode) => void;
  updateNote: (
    treeId: string
  ) => (node: BaseNode, data: Partial<DefaultNodeData>) => void;
  deleteNode: (treeId: string) => (node: DefaultNode) => void;
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

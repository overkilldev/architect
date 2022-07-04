// Interfaces and types from context Tree
import { Edge, NodeChange, OnInit } from "react-flow-renderer";
import { NodeTypes, OnConnect, OnEdgesChange } from "react-flow-renderer";

import { BaseNode } from "components/tree/BaseNode/BaseNode.types";
import { DefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";

// Provider Props
export interface TreeProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface TreeProviderValue {
  nodes: BaseNode[];
  setNodes: (nodes: BaseNode[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  selectedNode: BaseNode | null;
  setSelectedNode: (selectedNode: BaseNode | null) => void;
  nodeTypes: NodeTypes;
  onInit: OnInit;
  onNodesChange: (nodes: NodeChange[]) => Promise<BaseNode[]>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  createNode: (
    data?: Partial<DefaultNodeData>,
    type?: "defaultNode" | "rootNode"
  ) => BaseNode;
  getParentNode: (node: BaseNode) => BaseNode | undefined;
  getChildren: (node: BaseNode) => BaseNode[];
  getConnectedEdges: (node: BaseNode) => Edge[];
  addNode: (nodeData: AddNodeData, parentNode: BaseNode) => void;
  updateNote: (node: BaseNode, data: Partial<DefaultNodeData>) => void;
  deleteNode: (node: DefaultNode) => void;
}

export interface AddNodeData
  extends Omit<DefaultNodeData, "node" | "parentId"> {}

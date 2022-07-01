// Interfaces and types from context Tree
import { Edge, OnInit, OnNodesChange } from "react-flow-renderer";
import { NodeTypes, OnConnect, OnEdgesChange } from "react-flow-renderer";

import { INode } from "components/tree/CustomNode/CustomNode.types";
import { CustomNodeData } from "components/tree/CustomNode/CustomNode.types";

// Provider Props
export interface TreeProviderProps {
  children: React.ReactNode;
}

// Provider value
export interface TreeProviderValue {
  nodes: INode[];
  setNodes: (nodes: INode[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  selectedNode: INode | null;
  setSelectedNode: (selectedNode: INode | null) => void;
  nodeTypes: NodeTypes;
  onInit: OnInit;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  createNode: (id: string, data?: Partial<CustomNodeData>) => INode;
}

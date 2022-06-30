// Interfaces and types from context Tree
import { Dispatch, SetStateAction } from "react";
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
  setNodes: Dispatch<SetStateAction<INode[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  selectedNode: INode | null;
  setSelectedNode: Dispatch<SetStateAction<INode | null>>;
  nodeTypes: NodeTypes;
  onInit: OnInit;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  createNode: (
    parentNode: INode | null,
    id: string,
    data?: Partial<CustomNodeData>
  ) => INode;
}

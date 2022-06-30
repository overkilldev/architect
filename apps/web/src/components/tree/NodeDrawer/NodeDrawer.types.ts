// Interfaces and types from component NodeDrawer
import { Dispatch, SetStateAction } from "react";
import { Edge } from "react-flow-renderer";

import { DrawerProps } from "components/global/Drawer/Drawer.types";
import { INode } from "components/tree/CustomNode/CustomNode.types";
import { CustomNodeData } from "components/tree/CustomNode/CustomNode.types";

// Component Props
export interface NodeDrawerProps extends Omit<DrawerProps, "children"> {
  selectedNode: INode | null;
  mode: NodeFormMode;
  setNodes: Dispatch<SetStateAction<INode[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  createNode: (
    parentNode: INode | null,
    id: string,
    overrides?: Partial<CustomNodeData>
  ) => INode;
}

export type NodeFormMode = "CREATE" | "EDIT";

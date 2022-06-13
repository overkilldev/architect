// Interfaces and types from component NodeDrawer
import { Dispatch, SetStateAction } from "react";
import { Edge } from "react-flow-renderer";

import {
  ICustomNode,
  CustomNodeData
} from "components/CustomNode/CustomNode.types";
import { DrawerProps } from "components/global/Drawer/Drawer.types";

// Component Props
export interface NodeDrawerProps extends Omit<DrawerProps, "children"> {
  selectedNode: ICustomNode | null;
  mode: NodeFormMode;
  setNodes: Dispatch<SetStateAction<ICustomNode[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  createNode: (
    parentNode: ICustomNode | null,
    id: string,
    overrides?: Partial<CustomNodeData>
  ) => ICustomNode;
}

export type NodeFormMode = "CREATE" | "EDIT";

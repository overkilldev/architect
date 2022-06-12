// Interfaces and types from component NodeDrawer

import { ICustomNode } from "components/CustomNode/CustomNode.types";
import { DrawerProps } from "components/global/Drawer/Drawer.types";

// Component Props
export interface NodeDrawerProps extends Omit<DrawerProps, "children"> {
  selectedNode: ICustomNode;
}

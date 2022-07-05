// Interfaces and types from component NodeDrawer

import { DrawerProps } from "components/global/Drawer/Drawer.types";

// Component Props
export interface NodeDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {}

export interface NewNodeFormValues {
  pathname: string;
  alias: string;
  enhancedTemplate: string;
}

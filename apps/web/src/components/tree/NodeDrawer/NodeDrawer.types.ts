// Interfaces and types from component NodeDrawer
import { Template, Tree } from "@architect/types";

import { DrawerProps } from "components/global/Drawer/Drawer.types";

// Component Props
export interface NodeDrawerProps
  extends Omit<DrawerProps, "children" | "isOpen" | "onClose"> {
  treeId: string;
}

export interface NodeFormValues {
  pathname: string;
  alias: string;
  description: string;
  starterId: Template["id"] | Tree["id"];
  contentRaw: string;
  content: string;
}

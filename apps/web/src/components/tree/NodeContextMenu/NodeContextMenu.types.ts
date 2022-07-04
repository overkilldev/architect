// Interfaces and types from component NodeContextMenu
import { DefaultNode } from "../DefaultNode/DefaultNode.types";

// Component Props
export interface NodeContextMenuProps {
  node: DefaultNode;
  onEdit: () => void;
}

// Interfaces and types from component NodeContextMenu
import { INode } from "../CustomNode/CustomNode.types";

// Component Props
export interface NodeContextMenuProps {
  node: INode;
  onEdit: () => void;
}

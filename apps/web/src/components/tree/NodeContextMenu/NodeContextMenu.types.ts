// Interfaces and types from component NodeContextMenu
import { CustomNodeData } from "../CustomNode/CustomNode.types";

// Component Props
export interface NodeContextMenuProps {
  node: CustomNodeData;
  onEdit: () => void;
}

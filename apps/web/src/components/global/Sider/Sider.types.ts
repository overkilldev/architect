// Interfaces and types from component Sider
import { ReactNode } from "react";

// Component Props
export interface SiderProps {
  children: ReactNode;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
}

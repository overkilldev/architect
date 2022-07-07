// Interfaces and types from component FABItem
import { MouseEventHandler, ReactNode } from "react";

// Component Props
export interface FABItemProps {
  className?: string;
  onClick: MouseEventHandler<HTMLLIElement> | undefined;
  children: ReactNode;
}

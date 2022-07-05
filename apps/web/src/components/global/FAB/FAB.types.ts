// Interfaces and types from component FAB
import { FC, ReactNode } from "react";

import { FABItemProps } from "./FABItem/FABItem.types";

// Component Props
export interface FABProps {
  className?: string;
  children: ReactNode;
}

export interface FABExports {
  Item: FC<FABItemProps>;
}

export type IFAB = FC<FABProps> & FABExports;

// Interfaces and types from component TreeFAB
import { Dispatch, SetStateAction } from "react";

// Component Props
export interface TreeFABProps {
  changeActiveTree: Dispatch<SetStateAction<string>>;
}

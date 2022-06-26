import { DrawerProps as DrawerPropsUI } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface DrawerProps extends DrawerPropsUI {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

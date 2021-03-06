import { Drawer as DrawerUI, DrawerBody, DrawerFooter } from "@chakra-ui/react";
import { DrawerHeader, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import { DrawerCloseButton } from "@chakra-ui/react";
import { FC } from "react";

import { DrawerProps } from "./Drawer.types";

const Drawer: FC<DrawerProps> = props => {
  const { children, header, footer, ...rest } = props;

  return (
    <DrawerUI {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {header ? <DrawerHeader>{header}</DrawerHeader> : null}
        <DrawerBody>{children}</DrawerBody>
        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </DrawerUI>
  );
};

export default Drawer;

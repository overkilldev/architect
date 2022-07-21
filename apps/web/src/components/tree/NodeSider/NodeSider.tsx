import React, { useCallback } from "react";

import { NodeSiderProps as Props } from "./NodeSider.types";
import Sider from "components/global/Sider/Sider";
import useGlobalsStore from "contexts/globals/globals.context";

const NodeSider: React.FC<Props> = props => {
  const { children, ...rest } = props;
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { onClose, isOpen, onOpen } = nodeDrawer;

  const changeHandler = useCallback(
    (expanded: boolean) => {
      if (expanded) onOpen();
      else onClose();
    },
    [onClose, onOpen]
  );

  return (
    <Sider {...rest} expanded={isOpen} onChange={changeHandler}>
      {children}
    </Sider>
  );
};

NodeSider.defaultProps = {};

export default NodeSider;

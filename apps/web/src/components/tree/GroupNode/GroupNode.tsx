import React from "react";

import DefaultNode from "../DefaultNode/DefaultNode";
import { GroupNodeProps as Props } from "./GroupNode.types";

const GroupNode: React.FC<Props> = props => {
  return (
    <DefaultNode
      {...props}
      className="GroupNode h-96 w-fit bg-white/25"
      handlesType="group"
    />
  );
};

GroupNode.defaultProps = {};

export default GroupNode;

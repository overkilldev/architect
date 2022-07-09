import React from "react";

import BaseNode from "../BaseNode/BaseNode";
import { RootNodeProps as Props } from "./RootNode.types";

const RootNode: React.FC<Props> = props => {
  const { data } = props;
  const { pathname } = data;

  return (
    <BaseNode {...props} className="RootNode" handlesType="input">
      <p className="CustomNode__text flex-1 text-xs capitalize text-white text-center font-bold ">
        {pathname}
      </p>
    </BaseNode>
  );
};

RootNode.defaultProps = {};

export default RootNode;

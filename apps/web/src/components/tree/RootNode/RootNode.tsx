import React from "react";

import BaseNode from "../BaseNode/BaseNode";
import { RootNodeProps as Props } from "./RootNode.types";

const RootNode: React.FC<Props> = props => {
  const { data } = props;
  const { label } = data;

  return (
    <div className="RootNode">
      <BaseNode {...props} handlesType="input">
        <p className="CustomNode__text flex-1 text-xs capitalize text-white text-center font-bold ">
          {label}
        </p>
      </BaseNode>
    </div>
  );
};

RootNode.defaultProps = {};

export default RootNode;

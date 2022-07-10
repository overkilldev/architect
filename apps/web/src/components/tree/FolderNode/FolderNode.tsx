import React from "react";

import DefaultNode from "../DefaultNode/DefaultNode";
import { FolderNodeProps as Props } from "./FolderNode.types";

const FolderNode: React.FC<Props> = props => {
  return (
    <DefaultNode {...props} className="FolderNode" handlesType="default" />
  );
};

FolderNode.defaultProps = {};

export default FolderNode;

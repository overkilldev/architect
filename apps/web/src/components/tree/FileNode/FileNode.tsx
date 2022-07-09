import React from "react";

import DefaultNode from "../DefaultNode/DefaultNode";
import { FileNodeProps as Props } from "./FileNode.types";

const FileNode: React.FC<Props> = props => {
  return <DefaultNode {...props} className="FileNode" handlesType="output" />;
};

FileNode.defaultProps = {};

export default FileNode;

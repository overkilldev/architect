import { BaseNodeData } from "@architect/types";
import { Node } from "react-flow-renderer";

import { BaseNodeComponentProps } from "../BaseNode/BaseNode.types";

export interface DefaultNodeProps
  extends Omit<BaseNodeComponentProps<DefaultNodeData>, "children"> {}

export interface DefaultNodeData extends BaseNodeData<DefaultNode> {}

export type DefaultNode = Node<DefaultNodeData>;

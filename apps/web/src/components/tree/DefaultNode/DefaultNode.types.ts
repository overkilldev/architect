import { BaseNodeData } from "../BaseNode/BaseNode.types";
import { BaseNode } from "../BaseNode/BaseNode.types";
import { BaseNodeComponentProps } from "../BaseNode/BaseNode.types";

export interface DefaultNodeProps
  extends Omit<BaseNodeComponentProps<DefaultNodeData>, "children"> {}

export interface DefaultNodeData extends BaseNodeData {}

export type DefaultNode = BaseNode<DefaultNodeData>;

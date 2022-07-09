import { BaseNodeData, BaseNodeProps } from "../BaseNode/BaseNode.types";
import { BaseNode } from "../BaseNode/BaseNode.types";

export interface DefaultNodeProps extends BaseNodeProps<DefaultNodeData> {}

export interface DefaultNodeData extends BaseNodeData {}

export type DefaultNode = BaseNode<DefaultNodeData>;

import { Node } from "react-flow-renderer";

import { BaseNodeData, BaseNodeProps } from "../BaseNode/BaseNode.types";

export interface DefaultNodeProps extends BaseNodeProps<DefaultNodeData> {}

export interface DefaultNodeData extends BaseNodeData<DefaultNode> {}

export type DefaultNode = Node<DefaultNodeData>;

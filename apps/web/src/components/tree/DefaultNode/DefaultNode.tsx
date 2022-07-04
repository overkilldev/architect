import { FC, memo } from "react";

import BaseNode from "../BaseNode/BaseNode";
import NodeContextMenu from "../NodeContextMenu/NodeContextMenu";
import { DefaultNodeProps } from "./DefaultNode.types";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const DefaultNode: FC<DefaultNodeProps> = props => {
  const { data, xPos, yPos } = props;
  const { label, node, parentId } = data;
  const { centerOnNode } = useTreeAPI();
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { setFormMode, onOpen } = nodeDrawer;

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    centerOnNode(xPos, yPos + 100);
  };

  const actionHandler = () => {
    setSelectedNode(data.node);
    setFormMode("EDIT");
    onOpen();
  };

  const validClass = parentId ? "bg-lime-300" : "bg-red-500";

  return (
    <div className="DefaultNode">
      <BaseNode {...props}>
        <span
          className={`DefaultNode__status flex w-1 h-1 ${validClass} rounded-full mr-1`}
        />
        <p className="DefaultNode__text flex-1 text-xs capitalize text-white font-bold ">
          {label}
        </p>
        {node ? (
          <div onClick={clickHandler}>
            <NodeContextMenu onEdit={actionHandler} node={node} />
          </div>
        ) : null}
      </BaseNode>
    </div>
  );
};

export default memo(DefaultNode);

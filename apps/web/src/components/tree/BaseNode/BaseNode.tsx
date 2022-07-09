import { AddIcon } from "@chakra-ui/icons";
import { FC, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import "./BaseNode.css";
import { BaseNodeComponentProps as Props } from "./BaseNode.types";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const BaseNode: FC<Props> = props => {
  const { children, handlesType, className, onDoubleClick } = props;
  const { isConnectable, selected, xPos, yPos, data } = props;
  const { treeId } = data;
  const { centerOnNode } = useTreeAPI(treeId);
  const setSelectedNode = useTreeStore(state => state.setSelectedNode(treeId));
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { setFormMode, onOpen } = nodeDrawer;

  const clickHandler = () => {
    centerOnNode(xPos, yPos);
  };

  const actionHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedNode(data.node);
    setFormMode("CREATE");
    onOpen();
  };

  let nodeClasses = "flex p-2 rounded-lg ";
  if (selected) nodeClasses = `${nodeClasses} ring-violet-500/50 ring-2`;
  const nodeStyles = {
    outline: "1px solid rgb(139 92 246)",
    outlineOffset: "-1px"
  };

  return (
    <div
      className={`BaseNode bg-stone-900 shadow-2xl rounded-lg w-48 ${className}`}
      onClick={clickHandler}
      onDoubleClick={onDoubleClick}
    >
      <div className={nodeClasses} style={selected ? nodeStyles : undefined}>
        {handlesType === "default" || handlesType === "output" ? (
          <Handle
            type="target"
            position={Position.Top}
            id="a"
            className="BaseNode__dot"
            isConnectable={isConnectable}
          />
        ) : null}
        <div className="BaseNode__content flex flex-1 items-center">
          {children}
        </div>
        {handlesType === "default" || handlesType === "input" ? (
          <>
            <button
              className="BaseNode__add left-1/2 absolute bottom-0 px-3 py-2 bg-green-400 rounded-full shadow-md flex justify-center"
              onClick={actionHandler}
            >
              <AddIcon w={1.5} h={1.5} />
            </button>
            <Handle
              type="source"
              position={Position.Bottom}
              id="b"
              className="BaseNode__dot"
              isConnectable={isConnectable}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

BaseNode.defaultProps = {
  className: "",
  handlesType: "default"
};

export default memo(BaseNode);

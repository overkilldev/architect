import { AddIcon } from "@chakra-ui/icons";
import { FC, memo } from "react";
import { Handle, Position, useReactFlow } from "react-flow-renderer";

import NodeContextMenu from "../NodeContextMenu/NodeContextMenu";
import { CustomNodeProps } from "./CustomNode.types";
import CONSTANTS from "config/constants";
import "./CustomNode.css";
import { FormDrawerStates } from "contexts/globals/globals.context.types";
import useGlobals from "contexts/globals/globals.hooks";
import useTree from "contexts/tree/tree.hooks";

const { NODE_WIDTH, NODE_HEIGHT } = CONSTANTS.GENERAL;

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data, selected, xPos, yPos } = props;
  const { label, node } = data;
  const { setCenter } = useReactFlow();
  const { setSelectedNode } = useTree();
  const { setFormMode, onOpen } = useGlobals().nodeDrawer;

  const clickHandler = () => {
    setCenter(xPos + NODE_WIDTH / 2, yPos + NODE_HEIGHT / 2, {
      duration: 1000
    });
  };

  const actionHandler = (mode: FormDrawerStates) => {
    setSelectedNode(node);
    setFormMode(mode);
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
      className="CustomNode bg-stone-900 shadow-2xl rounded-lg w-48"
      onClick={clickHandler}
    >
      <div className={nodeClasses} style={selected ? nodeStyles : undefined}>
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          className="CustomNode__dot"
          isConnectable={isConnectable}
        />
        <div className="CustomNode__content flex flex-1 items-center">
          <span className="CustomNode__status flex w-1 h-1 bg-lime-300 rounded-full mr-1" />
          <p className="CustomNode__text flex-1 text-xs capitalize text-white font-bold ">
            {label}
          </p>
          <NodeContextMenu onEdit={() => actionHandler("EDIT")} node={data} />
        </div>
        <button
          className="CustomNode__add left-1/2 absolute bottom-0 px-4 py-2 bg-green-400 rounded-full shadow-md flex justify-center"
          onClick={e => {
            e.stopPropagation();
            actionHandler("CREATE");
          }}
        >
          <AddIcon w={2} h={2} />
        </button>
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          className="CustomNode__dot"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};

export default memo(CustomNode);

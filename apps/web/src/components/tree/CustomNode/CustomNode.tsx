import { AddIcon } from "@chakra-ui/icons";
import { FC, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import NodeContextMenu from "../NodeContextMenu/NodeContextMenu";
import { CustomNodeProps } from "./CustomNode.types";
import "./CustomNode.css";

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data, selected } = props;
  const { onClick, label, node } = data;

  let nodeClasses = "flex p-2 rounded-lg ";
  if (selected) nodeClasses = `${nodeClasses} ring-violet-500/50 ring-2`;
  const nodeStyles = {
    outline: "1px solid rgb(139 92 246)",
    outlineOffset: "-1px"
  };

  return (
    <div className="CustomNode bg-stone-900 shadow-2xl rounded-lg w-48">
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
          <NodeContextMenu onEdit={() => onClick(node, "EDIT")} node={data} />
        </div>
        <button
          className="CustomNode__add left-1/2 absolute bottom-0 px-4 py-2 bg-green-400 rounded-full shadow-md flex justify-center"
          onClick={e => {
            e.stopPropagation();
            onClick(node, "CREATE");
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

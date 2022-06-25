import { AddIcon } from "@chakra-ui/icons";
import { FC, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import "./CustomNode.css";
import { CustomNodeProps } from "./CustomNode.types";

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data } = props;
  const { onClick, label, node } = data;

  return (
    <div
      className="CustomNode p-4 border border-gray-900 bg-black text-white"
      onClick={() => onClick(node, "EDIT")}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        className="CustomNode__dot"
        isConnectable={isConnectable}
      />
      <p className="CustomNode__text text-[8px] capitalize">{label}</p>
      <button
        className="CustomNode__add left-1/2 absolute bottom-0 px-4 py-2 bg-green-400 h3 w-3 rounded-full shadow-md flex justify-center"
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
  );
};

export default memo(CustomNode);

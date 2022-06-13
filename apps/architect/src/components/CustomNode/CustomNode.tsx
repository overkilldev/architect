import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import "./CustomNode.css";
import { CustomNodeProps } from "./CustomNode.types";

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data } = props;
  const { onClick, label, node } = data;

  return (
    <div
      className="CustomNode p-4 border border-gray-900"
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
      <Button
        className="CustomNode__add"
        colorScheme="blue"
        size="xs"
        pos="absolute"
        bottom="-12px"
        onClick={e => {
          e.stopPropagation();
          onClick(node, "CREATE");
        }}
      >
        <AddIcon w={2} h={2} />
      </Button>
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

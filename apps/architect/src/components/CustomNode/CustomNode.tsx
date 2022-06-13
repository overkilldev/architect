import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { Handle, Position, addEdge } from "react-flow-renderer";

import "./CustomNode.css";
import { CustomNodeProps, ICustomNode } from "./CustomNode.types";

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data } = props;
  const { onClick, label, setNodes, setEdges, createNode, node } = data;

  const addNodeHandler = useCallback(
    (node: ICustomNode | null) => {
      setNodes(prev => {
        const newNode = createNode(node, `${prev.length}`);
        if (node) {
          setEdges(prev =>
            addEdge(
              {
                id: `${node.id}-${newNode.id}`,
                source: node.id,
                target: newNode.id,
                sourceHandle: "a",
                targetHandle: "b"
              },
              prev
            )
          );
        }
        return [...prev, newNode];
      });
    },
    [createNode, setEdges, setNodes]
  );

  return (
    <div className="CustomNode" onClick={() => onClick(node)}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        className="CustomNode__dot"
        isConnectable={isConnectable}
      />
      <p className="CustomNode__text">{label}</p>
      <Button
        className="CustomNode__add"
        colorScheme="blue"
        size="xs"
        pos="absolute"
        bottom="-12px"
        onClick={e => {
          e.stopPropagation();
          addNodeHandler(node);
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

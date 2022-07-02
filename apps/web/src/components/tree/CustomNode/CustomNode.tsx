import { AddIcon } from "@chakra-ui/icons";
import { FC, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import "./CustomNode.css";
import NodeContextMenu from "../NodeContextMenu/NodeContextMenu";
import { CustomNodeProps } from "./CustomNode.types";
import useGlobalsStore from "contexts/globals/globals.context";
import { FormDrawerStates } from "contexts/globals/globals.context.types";
import useTreeStore from "contexts/tree/tree.context";
import useTreeAPI from "hooks/tree.hooks";

const CustomNode: FC<CustomNodeProps> = props => {
  const { isConnectable, data, selected, xPos, yPos } = props;
  const { label, node } = data;
  const { centerOnNode } = useTreeAPI();
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { setFormMode, onOpen } = nodeDrawer;

  const clickHandler = () => {
    centerOnNode(xPos, yPos);
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
          <div
            onClick={e => {
              e.stopPropagation();
              centerOnNode(xPos, yPos + 100);
            }}
          >
            <NodeContextMenu onEdit={() => actionHandler("EDIT")} node={data} />
          </div>
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

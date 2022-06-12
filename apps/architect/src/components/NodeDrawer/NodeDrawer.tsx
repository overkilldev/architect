import React, { FormEvent } from "react";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import Drawer from "components/global/Drawer/Drawer";

const NodeDrawer: React.FC<Props> = props => {
  const { selectedNode, onClose, ...rest } = props;
  const { label, setNodes } = selectedNode.data;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNodes(prev => {
      return prev.map(node => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { ...node.data, label: "soy lo máximo" } };
        }
        return node;
      });
    });
    onClose();
  };

  return (
    <Drawer
      placement="right"
      header="Create your account"
      size="sm"
      onClose={onClose}
      {...rest}
    >
      <form onSubmit={submitHandler}>
        <input placeholder="Type here..." />
        <p>{label}</p>
        <button type="submit">Save</button>
      </form>
    </Drawer>
  );
};

NodeDrawer.defaultProps = {};

export default NodeDrawer;

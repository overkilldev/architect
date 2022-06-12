import React, { ChangeEvent, memo, useCallback, useState } from "react";
import { FormEvent } from "react";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import Drawer from "components/global/Drawer/Drawer";
import Input from "components/global/Input/Input";

const NodeDrawer: React.FC<Props> = props => {
  const { selectedNode, onClose, ...rest } = props;
  const { id, data } = selectedNode;
  const { label, setNodes } = data;
  const [formLabel, setFormLabel] = useState(label);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormLabel(e.target.value);
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNodes(prev => {
      return prev.map(node => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { ...node.data, label: formLabel } };
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
        <p className="pb-2 text-md font-medium">ID: {id}</p>
        <Input
          placeholder="Node label"
          label="Label"
          value={formLabel}
          onChange={changeHandler}
        />
        <Input
          placeholder="Choose or add a new template."
          label="Enhanced template"
        />
        <button
          type="submit"
          className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
        >
          Save
        </button>
      </form>
    </Drawer>
  );
};

NodeDrawer.defaultProps = {};

export default memo(NodeDrawer);

import React, { useCallback, useEffect, useState } from "react";
import { FormEvent, ChangeEvent, memo } from "react";
import { addEdge } from "react-flow-renderer";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import Autocomplete from "components/global/Autocomplete/Autocomplete";
import Drawer from "components/global/Drawer/Drawer";
import Input from "components/global/Input/Input";

const NodeDrawer: React.FC<Props> = props => {
  const {
    mode,
    selectedNode,
    onClose,
    createNode,
    setNodes,
    setEdges,
    ...rest
  } = props;

  const { id, data } = selectedNode ?? {};
  const { label = "" } = data ?? {};
  const [formLabel, setFormLabel] = useState("");

  const createHandler = useCallback(() => {
    setNodes(prev => {
      const newNode = createNode(selectedNode, `${prev.length}`, {
        label: formLabel
      });
      if (selectedNode) {
        setEdges(prev =>
          addEdge(
            {
              id: `${selectedNode.id}-${newNode.id}`,
              source: selectedNode.id,
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
  }, [createNode, formLabel, selectedNode, setEdges, setNodes]);

  const editHandler = useCallback(() => {
    if (!selectedNode) return;
    setNodes(prev => {
      return prev.map(node => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, label: formLabel } };
        }
        return node;
      });
    });
  }, [formLabel, id, setNodes, selectedNode]);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormLabel(e.target.value);
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "CREATE") {
      createHandler();
    } else if (mode === "EDIT") {
      editHandler();
    } else {
      throw new Error(`Unhandled mode: ${mode}`);
    }
    // Reset form
    setFormLabel("");
    onClose();
  };

  useEffect(() => {
    if (mode === "EDIT") setFormLabel(label);
  }, [label, mode]);

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
          autoFocus
        />
        <Autocomplete
          options={["Alex", "Dani", "Lucho"]}
          lastOption={<div onClick={() => console.log("creating")}>Crear</div>}
          label="Enhanced template"
          inputProps={{ placeholder: "Choose or add a new template." }}
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

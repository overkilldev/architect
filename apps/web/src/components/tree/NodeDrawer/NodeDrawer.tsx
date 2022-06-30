import React, { useCallback, useEffect, useState } from "react";
import { FormEvent, ChangeEvent, memo } from "react";
import { addEdge } from "react-flow-renderer";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import Button from "components/global/Button/Button";
import Drawer from "components/global/Drawer/Drawer";
import EnhancedTemplateAutocomplete from "components/global/EnhancedTemplateAutocomplete/EnhancedTemplateAutocomplete";
import Input from "components/global/Input/Input";
import useGlobals from "contexts/globals/globals.hooks";
import useTree from "contexts/tree/tree.hooks";

const NodeDrawer: React.FC<Props> = props => {
  const { formMode, onClose, isOpen } = useGlobals().nodeDrawer;
  const { selectedNode, setNodes, setEdges, createNode } = useTree();

  const { id, data } = selectedNode ?? {};
  const { label = "" } = data ?? {};
  const [formLabel, setFormLabel] = useState("");

  // TODO: mover como action del context
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
    if (formMode === "CREATE") {
      createHandler();
    } else if (formMode === "EDIT") {
      editHandler();
    } else {
      throw new Error(`Unhandled mode: ${formMode}`);
    }
    // Reset form
    setFormLabel("");
    onClose();
  };

  useEffect(() => {
    if (formMode === "EDIT") setFormLabel(label);
  }, [label, formMode]);

  return (
    <Drawer
      placement="right"
      size="sm"
      onClose={onClose}
      isOpen={isOpen}
      {...props}
    >
      <h2 className="font-bold text-xl uppercase py-3">Create your account</h2>
      <form onSubmit={submitHandler}>
        <p className="pb-2 text-md font-medium">ID: {id}</p>
        <Input
          placeholder="Node label"
          label="Label"
          value={formLabel}
          onChange={changeHandler}
          autoFocus
        />
        <EnhancedTemplateAutocomplete />
        <Button type="submit">Save</Button>
      </form>
    </Drawer>
  );
};

NodeDrawer.defaultProps = {};

export default memo(NodeDrawer);

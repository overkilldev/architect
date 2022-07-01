import React, { useCallback, useEffect, useState } from "react";
import { FormEvent, ChangeEvent, memo } from "react";
import { addEdge } from "react-flow-renderer";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import Button from "components/global/Button/Button";
import Drawer from "components/global/Drawer/Drawer";
import EnhancedTemplateAutocomplete from "components/global/EnhancedTemplateAutocomplete/EnhancedTemplateAutocomplete";
import Input from "components/global/Input/Input";
import useGlobals from "contexts/globals/globals.context";
import useTree from "contexts/tree/tree.context";

const NodeDrawer: React.FC<Props> = props => {
  const nodeDrawer = useGlobals(state => state.nodeDrawer);
  const { formMode, onClose, isOpen } = nodeDrawer;
  const selectedNode = useTree(state => state.selectedNode);
  const setNodes = useTree(state => state.setNodes);
  const setEdges = useTree(state => state.setEdges);
  const createNode = useTree(state => state.createNode);
  const setSelectedNode = useTree(state => state.setSelectedNode);
  const nodes = useTree(state => state.nodes);
  const edges = useTree(state => state.edges);

  const { id, data } = selectedNode ?? {};
  const { label = "" } = data ?? {};
  const [formLabel, setFormLabel] = useState("");

  const closeHandler = () => {
    setSelectedNode(null);
    onClose();
  };

  // TODO: mover como action del context
  const createHandler = useCallback(() => {
    const newNode = createNode(`${nodes.length}`, {
      label: formLabel
    });
    if (selectedNode) {
      const newEdges = addEdge(
        {
          id: `${selectedNode.id}-${newNode.id}`,
          source: selectedNode.id,
          target: newNode.id,
          sourceHandle: "a",
          targetHandle: "b"
        },
        edges
      );
      setEdges(newEdges);
    }
    setNodes([...nodes, newNode]);
  }, [createNode, edges, formLabel, nodes, selectedNode, setEdges, setNodes]);

  const editHandler = useCallback(() => {
    if (!selectedNode) return;
    const newNodes = nodes.map(node => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, label: formLabel } };
      }
      return node;
    });
    setNodes(newNodes);
  }, [selectedNode, nodes, setNodes, id, formLabel]);

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
    closeHandler();
  };

  useEffect(() => {
    if (formMode === "EDIT") setFormLabel(label);
  }, [label, formMode]);

  return (
    <Drawer
      placement="right"
      size="sm"
      onClose={closeHandler}
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

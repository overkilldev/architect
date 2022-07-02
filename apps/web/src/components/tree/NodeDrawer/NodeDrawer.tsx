import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { memo } from "react";
import { addEdge } from "react-flow-renderer";
import { SubmitHandler, useForm } from "react-hook-form";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import { NewNodeFormValues } from "./NodeDrawer.types";
import Button from "components/global/Button/Button";
import Drawer from "components/global/Drawer/Drawer";
import EnhancedTemplateAutocomplete from "components/global/EnhancedTemplateAutocomplete/EnhancedTemplateAutocomplete";
import Input from "components/global/Input/Input";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { newNodeFormSchema } from "utils/forms.utils";

const NodeDrawer: React.FC<Props> = props => {
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { formMode, onClose, isOpen } = nodeDrawer;
  const selectedNode = useTreeStore(state => state.selectedNode);
  const setNodes = useTreeStore(state => state.setNodes);
  const setEdges = useTreeStore(state => state.setEdges);
  const createNode = useTreeStore(state => state.createNode);
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const nodes = useTreeStore(state => state.nodes);
  const edges = useTreeStore(state => state.edges);
  const { id, data } = selectedNode ?? {};
  const { label } = data ?? {};
  const formMethods = useForm<NewNodeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(newNodeFormSchema),
    defaultValues: {
      label
    }
  });
  const { handleSubmit, register, formState, reset } = formMethods;
  const { errors } = formState;

  const closeHandler = () => {
    setSelectedNode(null);
    reset();
    onClose();
  };

  // TODO: mover como action del context
  const createHandler = useCallback(
    (label: string) => {
      const newNode = createNode(`${nodes.length}`, {
        label,
        parentId: selectedNode?.id
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
    },
    [createNode, edges, nodes, selectedNode, setEdges, setNodes]
  );

  const editHandler = useCallback(
    (label: string) => {
      if (!selectedNode) return;
      const newNodes = nodes.map(node => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, label } };
        }
        return node;
      });
      setNodes(newNodes);
    },
    [selectedNode, nodes, setNodes, id]
  );

  const submitHandler: SubmitHandler<NewNodeFormValues> = values => {
    const { label } = values;
    if (formMode === "CREATE") {
      createHandler(label);
    } else if (formMode === "EDIT") {
      editHandler(label);
    } else {
      throw new Error(`Unhandled mode: ${formMode}`);
    }
    closeHandler();
  };

  return (
    <Drawer
      placement="right"
      size="sm"
      onClose={closeHandler}
      isOpen={isOpen}
      {...props}
    >
      <h2 className="font-bold text-xl uppercase py-3">Create your account</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <p className="pb-2 text-md font-medium">ID: {id}</p>
        <Input
          placeholder="Node label"
          label="Label"
          autoFocus
          errorMessage={errors.label?.message}
          {...register("label")}
        />
        <EnhancedTemplateAutocomplete />
        <Button type="submit">Save</Button>
      </form>
    </Drawer>
  );
};

NodeDrawer.defaultProps = {};

export default memo(NodeDrawer);

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { memo } from "react";
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
  const addNode = useTreeStore(state => state.addNode);
  const updateNote = useTreeStore(state => state.updateNote);
  const setSelectedNode = useTreeStore(state => state.setSelectedNode);
  const { id, data } = selectedNode ?? {};
  const { label } = data ?? {};
  const formMethods = useForm<NewNodeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(newNodeFormSchema),
    defaultValues: formMode === "EDIT" ? { label } : undefined
  });
  const { handleSubmit, register, formState, reset } = formMethods;
  const { errors } = formState;

  const closeHandler = () => {
    setSelectedNode(null);
    reset();
    onClose();
  };

  const submitHandler: SubmitHandler<NewNodeFormValues> = values => {
    const { label } = values;
    if (!selectedNode) throw new Error("There must be a selected node now");
    if (formMode === "CREATE") {
      addNode({ label }, selectedNode);
    } else if (formMode === "EDIT") {
      updateNote(selectedNode, { label });
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

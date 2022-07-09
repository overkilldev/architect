import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NodeDrawerProps as Props } from "./NodeDrawer.types";
import { NodeFormValues } from "./NodeDrawer.types";
import Button from "components/global/Button/Button";
import Drawer from "components/global/Drawer/Drawer";
import EnhancedTemplateAutocomplete from "components/global/EnhancedTemplateAutocomplete/EnhancedTemplateAutocomplete";
import Input from "components/global/Input/Input";
import Textarea from "components/global/Textarea/Textarea";
import useGlobalsStore from "contexts/globals/globals.context";
import useTreeStore from "contexts/tree/tree.context";
import { nodeFormSchema } from "utils/forms.utils";

const NodeDrawer: React.FC<Props> = props => {
  const { treeId } = props;
  const nodeDrawer = useGlobalsStore(state => state.nodeDrawer);
  const { formMode, onClose, isOpen } = nodeDrawer;
  const selectedNode = useTreeStore(state => state.selectedNode.get(treeId));
  const addNode = useTreeStore(state => state.addNode(treeId));
  const updateNode = useTreeStore(state => state.updateNode(treeId));
  const setSelectedNode = useTreeStore(state => state.setSelectedNode(treeId));
  const { id, data } = selectedNode ?? {};
  const { absolutePathname, pathname, alias, description } = data ?? {};
  const formMethods = useForm<NodeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(nodeFormSchema),
    defaultValues:
      formMode === "EDIT" ? { pathname, alias, description } : undefined
  });
  const { handleSubmit, register, formState, reset } = formMethods;
  const { errors } = formState;

  const closeHandler = () => {
    setSelectedNode(null);
    reset();
    onClose();
  };

  const submitHandler: SubmitHandler<NodeFormValues> = values => {
    if (!selectedNode) throw new Error("There must be a selected node now");
    const type = values.alias ? "fileNode" : undefined;
    if (formMode === "CREATE") {
      addNode({ ...values, treeId }, selectedNode, type);
      if (selectedNode.type !== "rootNode") {
        updateNode(selectedNode, {}, "folderNode");
      }
    } else if (formMode === "EDIT") {
      updateNode(selectedNode, values, type);
    } else {
      throw new Error(`Unhandled mode: ${formMode}`);
    }
    closeHandler();
  };

  const itemClasses = "pb-2 text-sm font-medium text-gray-400";

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
        <Input
          label="Pathname"
          placeholder="Node pathname"
          autoFocus
          errorMessage={errors.pathname?.message}
          {...register("pathname")}
        />
        <Input
          label="Alias"
          placeholder="Node alias name"
          errorMessage={errors.alias?.message}
          {...register("alias")}
        />
        <EnhancedTemplateAutocomplete />
        <Textarea
          label="Description"
          placeholder="Describe what makes this node special"
          errorMessage={errors.alias?.message}
          {...register("description")}
        />
        <p className={itemClasses}>ID: {id}</p>
        {absolutePathname ? (
          <p className={itemClasses}>Absolute pathname: {absolutePathname}</p>
        ) : null}
        <Button type="submit">Save</Button>
      </form>
    </Drawer>
  );
};

NodeDrawer.defaultProps = {};

export default memo(NodeDrawer);

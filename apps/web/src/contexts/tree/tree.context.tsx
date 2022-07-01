import React, { useCallback, useMemo } from "react";
import { NodeTypes, addEdge } from "react-flow-renderer";
import { applyEdgeChanges, applyNodeChanges } from "react-flow-renderer";
import create, { StoreApi } from "zustand";
import createContext from "zustand/context";

import { TreeProviderProps as Props } from "./tree.context.types";
import { TreeProviderValue } from "./tree.context.types";
import CustomNode from "components/tree/CustomNode/CustomNode";
import { INode } from "components/tree/CustomNode/CustomNode.types";
import { CustomNodeData } from "components/tree/CustomNode/CustomNode.types";
import { createGraphLayout } from "utils/elk.utils";

type TreeStoreApi = StoreApi<TreeProviderValue>;
const { Provider, useStore: useTree } = createContext<TreeStoreApi>();

export const TreeProvider: React.FC<Props> = props => {
  const nodeTypes = useMemo<NodeTypes>(() => ({ customNode: CustomNode }), []);

  const createNode = useCallback(
    (id: string, data: Partial<CustomNodeData> = {}): INode => {
      const newNode: INode = {
        // TODO: ver si eliminamos param y usamos useId de react
        id,
        type: "customNode",
        data: { label: `Node ${id}`, node: null, ...data },
        position: { x: 0, y: 0 }
      };
      newNode.data.node = newNode;
      return newNode;
    },
    []
  );

  const value = () => {
    return create<TreeProviderValue>((set, get) => ({
      nodes: [],
      setNodes: nodes => set({ nodes }),
      edges: [],
      setEdges: edges => set({ edges }),
      selectedNode: null,
      setSelectedNode: selectedNode => set({ selectedNode }),
      onInit: async reactFlowInstance => {
        try {
          const nodes = await createGraphLayout(
            reactFlowInstance.getNodes(),
            reactFlowInstance.getEdges()
          );
          get().setNodes(nodes);
          reactFlowInstance.fitView();
        } catch (error) {
          console.error(error);
        }
      },
      onNodesChange: async changes => {
        // TODO: seguro aquí o en onConnect ? inclusive en otro lado
        if (changes[0].type === "dimensions") {
          const newNodes = await createGraphLayout(get().nodes, get().edges);
          get().setNodes(applyNodeChanges(changes, newNodes));
        } else {
          get().setNodes(applyNodeChanges(changes, get().nodes));
        }
      },
      onEdgesChange: changes => {
        get().setEdges(applyEdgeChanges(changes, get().edges));
      },
      onConnect: params => {
        get().setEdges(addEdge({ ...params }, get().edges));
      },
      nodeTypes,
      createNode
    }));
  };

  return <Provider createStore={value}>{props.children}</Provider>;
};

export default useTree;

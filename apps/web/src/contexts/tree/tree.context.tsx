import React, { createContext, useCallback, useMemo, useState } from "react";
import { Connection, useReactFlow, Edge, NodeTypes } from "react-flow-renderer";
import { OnInit, applyEdgeChanges } from "react-flow-renderer";
import { applyNodeChanges, OnEdgesChange } from "react-flow-renderer";
import { addEdge, OnNodesChange, OnConnect } from "react-flow-renderer";

import { TreeProviderProps as Props } from "./tree.context.types";
import { TreeProviderValue } from "./tree.context.types";
import CustomNode from "components/tree/CustomNode/CustomNode";
import { INode } from "components/tree/CustomNode/CustomNode.types";
import { CustomNodeData } from "components/tree/CustomNode/CustomNode.types";
import { createGraphLayout } from "utils/elk.utils";

// @ts-ignore
export const TreeContext = createContext<TreeProviderValue>();

const TreeProvider: React.FC<Props> = props => {
  const { fitView, getViewport } = useReactFlow();
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<INode | null>(null);

  const onInit: OnInit = async reactFlowInstance => {
    try {
      const nodes = await createGraphLayout(
        reactFlowInstance.getNodes(),
        reactFlowInstance.getEdges()
      );
      setNodes(nodes);
      reactFlowInstance.fitView();
    } catch (error) {
      console.error(error);
    }
  };

  const onNodesChange: OnNodesChange = useCallback(
    async changes => {
      // TODO: seguro aquí o en onConnect ? inclusive en otro lado
      if (changes[0].type === "dimensions") {
        const newNodes = await createGraphLayout(nodes, edges);
        setNodes(applyNodeChanges(changes, newNodes));
        fitView({ duration: 1000 });
      } else {
        setNodes(prev => applyNodeChanges(changes, prev));
      }
    },
    [nodes, edges, setNodes, fitView]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      return setEdges(edges => addEdge({ ...params }, edges));
    },
    [setEdges]
  );

  const nodeTypes = useMemo<NodeTypes>(() => ({ customNode: CustomNode }), []);

  const createNode = useCallback(
    (
      parentNode: INode | null,
      id: string,
      data: Partial<CustomNodeData> = {}
    ): INode => {
      const { x, y } = getViewport();
      const newNode: INode = {
        // TODO: ver si eliminamos param y usamos useId de react
        id,
        type: "customNode",
        data: {
          label: `Node ${id}`,
          node: null,
          ...data
        },
        position: { x, y }
      };
      newNode.data.node = newNode;
      const { width, height } = parentNode ?? {};
      if (parentNode && width && height) {
        const { position } = parentNode;
        newNode.position = {
          x: position.x,
          y: position.y + height + 25
        };
      }
      return newNode;
    },
    [getViewport]
  );

  const value: TreeProviderValue = useMemo(() => {
    return {
      nodes,
      setNodes,
      edges,
      setEdges,
      selectedNode,
      setSelectedNode,
      nodeTypes,
      onInit,
      onNodesChange,
      onEdgesChange,
      onConnect,
      createNode
    };
  }, [
    createNode,
    edges,
    nodeTypes,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    selectedNode
  ]);

  return (
    <TreeContext.Provider value={value}>{props.children}</TreeContext.Provider>
  );
};

export default TreeProvider;

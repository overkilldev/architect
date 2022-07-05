import { NodeTypes, addEdge, getIncomers } from "react-flow-renderer";
import { getOutgoers, getConnectedEdges } from "react-flow-renderer";
import { applyEdgeChanges, applyNodeChanges } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

import { TreeProviderValue } from "./tree.context.types";
import DefaultNode from "components/tree/DefaultNode/DefaultNode";
import { DefaultNode as IDefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";
import RootNode from "components/tree/RootNode/RootNode";
import { createGraphLayout } from "utils/elk.utils";

const nodeTypes: NodeTypes = { rootNode: RootNode, defaultNode: DefaultNode };

const createNode = (
  data: Partial<DefaultNodeData> = {},
  type = "defaultNode"
) => {
  const newNode: IDefaultNode = {
    id: uuidv4(),
    type,
    data: {
      label: `Node`,
      // @ts-ignore node is later assigned to itself
      node: null,
      ...data
    },
    position: { x: 0, y: 0 }
  };
  newNode.data.node = newNode;
  return newNode;
};

const useTreeStore = create<TreeProviderValue>((set, get) => ({
  nodes: [createNode({ pathname: "./", absolutePathname: "." }, "rootNode")],
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
      return newNodes;
    } else {
      get().setNodes(applyNodeChanges(changes, get().nodes));
      return get().nodes;
    }
  },
  onEdgesChange: changes => {
    get().setEdges(applyEdgeChanges(changes, get().edges));
  },
  onConnect: params => {
    get().setEdges(addEdge({ ...params }, get().edges));
  },
  nodeTypes,
  getParentNode: node => getIncomers(node, get().nodes, get().edges)[0],
  getChildren: node => getOutgoers(node, get().nodes, get().edges),
  getConnectedEdges: node => getConnectedEdges([node], get().edges),
  createNode,
  addNode: (data, parentNode) => {
    const { id: parentId, data: parentData } = parentNode;
    const { pathname, absolutePathname = pathname } = parentData;
    const childAbsolutePathname = `${absolutePathname}/${data.pathname}`;
    const childData = {
      ...data,
      parentId,
      absolutePathname: childAbsolutePathname
    };
    const newNode = get().createNode(childData);
    const newEdges = addEdge(
      {
        id: `${parentId}-${newNode.id}`,
        source: parentId,
        target: newNode.id,
        sourceHandle: "a",
        targetHandle: "b"
      },
      get().edges
    );
    get().setEdges(newEdges);
    get().setNodes([...get().nodes, newNode]);
  },
  updateNote: (node, data) => {
    const newNodes = get().nodes.map(item => {
      if (item.id === node.id) {
        return { ...item, data: { ...item.data, ...data } };
      }
      return item;
    });
    get().setNodes(newNodes);
  },
  deleteNode: node => {
    const filteredNodes = get().nodes.filter(
      item => item.id !== node?.data.node?.id
    );
    const childrenIds = get()
      .getChildren(node)
      .map(child => child.id);
    const newNodes = filteredNodes.map(node => {
      if (childrenIds.includes(node.id)) {
        node.data = {
          ...node.data,
          parentId: undefined,
          absolutePathname: node.data.pathname
        };
      }
      return node;
    });
    const edgesIds = get()
      .getConnectedEdges(node)
      .map(edge => edge.id);
    const filteredEdges = get().edges.filter(item => {
      return !edgesIds.includes(item.id);
    });
    set({ edges: filteredEdges });
    set({ nodes: newNodes });
  }
}));

export default useTreeStore;

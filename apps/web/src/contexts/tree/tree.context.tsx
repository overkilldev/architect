import { NodeTypes, addEdge, getIncomers } from "react-flow-renderer";
import { getOutgoers, getConnectedEdges } from "react-flow-renderer";
import { applyEdgeChanges, applyNodeChanges } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

import { TreeProviderValue } from "./tree.context.types";
import DefaultNode from "components/tree/DefaultNode/DefaultNode";
import { DefaultNode as IDefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";
import FileNode from "components/tree/FileNode/FileNode";
import FolderNode from "components/tree/FolderNode/FolderNode";
import RootNode from "components/tree/RootNode/RootNode";
import { createGraphLayout } from "utils/elk.utils";

const nodeTypes: NodeTypes = {
  rootNode: RootNode,
  defaultNode: DefaultNode,
  folderNode: FolderNode,
  fileNode: FileNode
};

const createNode = (
  data: Partial<DefaultNodeData> = {},
  type = "defaultNode"
) => {
  const date = new Date().toISOString();
  const newNode: IDefaultNode = {
    id: uuidv4(),
    type,
    data: {
      label: `Node`,
      // @ts-ignore node is later assigned to itself
      node: null,
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
      ...data
    },
    position: { x: 0, y: 0 }
  };
  newNode.data.node = newNode;
  return newNode;
};

const defaultTreeId = "0";

const createDefaultNode = (treeId: string) => {
  return createNode(
    { pathname: "./", absolutePathname: ".", treeId },
    "rootNode"
  );
};

const useTreeStore = create<TreeProviderValue>((set, get) => ({
  trees: [defaultTreeId],
  addTree: () => {
    const newTreeId = get().trees.length.toString();
    set({ trees: [...get().trees, newTreeId] });
    set({ nodes: get().nodes.set(newTreeId, [createDefaultNode(newTreeId)]) });
    set({ edges: get().edges.set(newTreeId, []) });
    set({ selectedNode: get().selectedNode.set(newTreeId, null) });
    return newTreeId;
  },
  nodes: new Map().set(defaultTreeId, [createDefaultNode(defaultTreeId)]),
  setNodes: treeId => nodes => set({ nodes: get().nodes.set(treeId, nodes) }),
  edges: new Map().set(defaultTreeId, []),
  setEdges: treeId => edges => set({ edges: get().edges.set(treeId, edges) }),
  selectedNode: new Map().set(defaultTreeId, null),
  setSelectedNode: treeId => selectedNode => {
    set({ selectedNode: get().selectedNode.set(treeId, selectedNode) });
  },
  onInit: treeId => async reactFlowInstance => {
    try {
      const nodes = await createGraphLayout(
        reactFlowInstance.getNodes(),
        reactFlowInstance.getEdges()
      );
      get().setNodes(treeId)(nodes);
      reactFlowInstance.fitView();
    } catch (error) {
      console.error(error);
    }
  },
  onNodesChange: treeId => async changes => {
    // TODO: seguro aquí o en onConnect ? inclusive en otro lado
    if (changes[0].type === "dimensions") {
      const newNodes = await createGraphLayout(
        get().nodes.get(treeId)!,
        get().edges.get(treeId)!
      );
      get().setNodes(treeId)(applyNodeChanges(changes, newNodes));
      return newNodes;
    } else {
      get().setNodes(treeId)(
        applyNodeChanges(changes, get().nodes.get(treeId)!)
      );
      return get().nodes.get(treeId)!;
    }
  },
  onEdgesChange: treeId => changes => {
    get().setEdges(treeId)(applyEdgeChanges(changes, get().edges.get(treeId)!));
  },
  onConnect: treeId => params => {
    get().setEdges(treeId)(addEdge({ ...params }, get().edges.get(treeId)!));
  },
  nodeTypes,
  getParentNode: treeId => node => {
    return getIncomers(
      node,
      get().nodes.get(treeId)!,
      get().edges.get(treeId)!
    )[0];
  },
  getChildren: treeId => node => {
    return getOutgoers(
      node,
      get().nodes.get(treeId)!,
      get().edges.get(treeId)!
    );
  },
  getConnectedEdges: treeId => node =>
    getConnectedEdges([node], get().edges.get(treeId)!),
  createNode,
  addNode:
    treeId =>
    (data, parentNode, type = "defaultNode") => {
      const { id: parentId, data: parentData } = parentNode;
      const { pathname, absolutePathname = pathname } = parentData;
      const childAbsolutePathname = `${absolutePathname}/${data.pathname}`;
      const childData = {
        ...data,
        parentId,
        absolutePathname: childAbsolutePathname
      };
      const newNode = get().createNode(childData, type);
      const newEdges = addEdge(
        {
          id: `${parentId}-${newNode.id}`,
          source: parentId,
          target: newNode.id,
          sourceHandle: "a",
          targetHandle: "b"
        },
        get().edges.get(treeId)!
      );
      get().setEdges(treeId)(newEdges);
      get().setNodes(treeId)([...get().nodes.get(treeId)!, newNode]);
    },
  updateNode: treeId => (node, data, type) => {
    const newNodes = get()
      .nodes.get(treeId)!
      .map(item => {
        if (item.id === node.id) {
          item.data = {
            ...item.data,
            ...data,
            updatedAt: new Date().toISOString()
          };
          if (type) item.type = type;
          item.data.node = item;
        }
        return item;
      });
    get().setNodes(treeId)(newNodes);
  },
  deleteNode: treeId => node => {
    const filteredNodes = get()
      .nodes.get(treeId)!
      .filter(item => item.id !== node?.data.node?.id);
    const childrenIds = get()
      .getChildren(treeId)(node)
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
      .getConnectedEdges(treeId)(node)
      .map(edge => edge.id);
    const filteredEdges = get()
      .edges.get(treeId)!
      .filter(item => {
        return !edgesIds.includes(item.id);
      });
    get().setEdges(treeId)(filteredEdges);
    get().setNodes(treeId)(newNodes);
  }
}));

export default useTreeStore;

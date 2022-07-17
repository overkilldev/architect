import { addEdge, getIncomers } from "react-flow-renderer";
import { getOutgoers, getConnectedEdges } from "react-flow-renderer";
import { applyEdgeChanges, applyNodeChanges } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

import { NodeTypeName, NodeTypes } from "./tree.context.types";
import { TreeProviderValue } from "./tree.context.types";
import { BaseNode } from "components/tree/BaseNode/BaseNode.types";
import { BaseNodeData } from "components/tree/BaseNode/BaseNode.types";
import DefaultNode from "components/tree/DefaultNode/DefaultNode";
import { DefaultNode as IDefaultNode } from "components/tree/DefaultNode/DefaultNode.types";
import { DefaultNodeData } from "components/tree/DefaultNode/DefaultNode.types";
import FileNode from "components/tree/FileNode/FileNode";
import FolderNode from "components/tree/FolderNode/FolderNode";
import GroupNode from "components/tree/GroupNode/GroupNode";
import RootNode from "components/tree/RootNode/RootNode";
import { createGraphLayout } from "utils/elk.utils";
import { transformNodesToBaseNodes } from "utils/tree.utils";

const nodeTypes: NodeTypes = {
  rootNode: RootNode,
  defaultNode: DefaultNode,
  folderNode: FolderNode,
  fileNode: FileNode,
  groupNode: GroupNode
};

const createNode = (
  data: Partial<DefaultNodeData> = {},
  type: NodeTypeName = "defaultNode"
): IDefaultNode => {
  const newNode: IDefaultNode = {
    id: uuidv4(),
    type,
    data: {
      // @ts-ignore node is later assigned to itself
      node: null,
      ...data
    },
    position: { x: 0, y: 0 }
  };
  newNode.data.node = newNode;
  return newNode;
};

const defaultTreeId = uuidv4();

const createDefaultNode = (treeId: string) => {
  return createNode(
    { pathname: "./", absolutePathname: ".", treeId },
    "rootNode"
  );
};

const useTreeStore = create<TreeProviderValue>((set, get) => ({
  activeTreeId: defaultTreeId,
  setActiveTreeId: treeId => set({ activeTreeId: treeId }),
  treesIds: [defaultTreeId],
  addTree: tree => {
    const { id, nodes: treeNodes, edges: treeEdges } = tree ?? {};
    const baseNodes = transformNodesToBaseNodes(treeNodes);
    const nodes = id && baseNodes ? new Map([[id, baseNodes]]) : undefined;
    const edges = id && treeEdges ? new Map([[id, treeEdges]]) : undefined;
    const newTreeId = id ?? uuidv4();
    set({ treesIds: [...get().treesIds, newTreeId] });
    set({
      nodes: nodes ?? get().nodes.set(newTreeId, [createDefaultNode(newTreeId)])
    });
    set({ edges: edges ?? get().edges.set(newTreeId, []) });
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
      return newNode;
    },
  updateNode: treeId => (node, data, type) => {
    const newNodes = get()
      .nodes.get(treeId)!
      .map(item => {
        if (item.id === node.id) {
          item.data = { ...item.data, ...data };
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
      .filter(item => item.id !== node?.id);
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
  },
  addSubTree: treeId => (subTree, parentNode, data) => {
    const { nodes: treeNodes, edges: treeEdges } = subTree;
    // Get the new group node
    const groupNode = get().addNode(treeId)(data, parentNode, "groupNode");
    // Get current nodes and edges
    const nodes = get().nodes.get(treeId);
    const edges = get().edges.get(treeId);
    // Clone tree edges
    const newEdges = treeEdges.map(edge => ({ ...edge }));
    get().setNodes(treeId)([
      ...nodes!,
      ...(treeNodes.map(node => {
        // Create new id for each upcoming tree node
        const newNodeId = uuidv4();
        // For each node we edit all related edges
        newEdges.forEach(edge => {
          // Since the edge id is constructed with the union of the parent node
          // id and the node id, here it replaces the corresponding id value
          if (edge.id.includes(node.id)) {
            edge.id = edge.id.replace(node.id, newNodeId);
          }
          // The source id is changed for the node's one if are equal
          if (edge.source === node.id) edge.source = newNodeId;
          // The target id is changed for the node's one if are equal
          if (edge.target === node.id) edge.target = newNodeId;
        });
        const newNode = {
          ...node,
          id: newNodeId,
          parentNode: groupNode.id,
          extent: "parent"
        };
        // @ts-ignore FIXME: fix types
        newNode.data.node = newNode;
        return newNode;
      }) as BaseNode<BaseNodeData>[])
    ]);
    get().setEdges(treeId)([...edges!, ...newEdges]);
    console.log({ subTree, groupNode, newEdges });
  }
}));

export default useTreeStore;

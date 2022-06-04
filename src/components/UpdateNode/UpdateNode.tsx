import { useCallback, useMemo, useRef } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance } from "react-flow-renderer";
import { addEdge, Connection } from "react-flow-renderer";
import { Node, OnNodesChange } from "react-flow-renderer";
import { createGraphLayout } from "../../utils";
import CustomNode from "../CustomNode/CustomNode";

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const fitViewRef = useRef(() => {});
  const nodesLengthRef = useRef(edges.length);

  const onConnect = useCallback(
    (params: Connection) => {
      return setEdges((edges) => addEdge({ ...params }, edges));
    },
    [setEdges]
  );

  const onInit = async (reactFlowInstance: ReactFlowInstance) => {
    try {
      const nodes = await createGraphLayout(
        reactFlowInstance.getNodes(),
        reactFlowInstance.getEdges()
      );
      setNodes(nodes);
      reactFlowInstance.fitView();
      fitViewRef.current = reactFlowInstance.fitView;
    } catch (error) {
      console.error(error);
    }
  };

  const createNode = (parentNode: Node | null, id: string): Node => {
    const newNode = {
      id,
      type: "customNode",
      data: { label: `Node ${id}` },
      position: { x: 0, y: 0 },
    };
    const { width, height } = parentNode ?? {};
    if (parentNode && width && height) {
      const { position } = parentNode;
      newNode.position = {
        x: position.x,
        y: position.y + height + 25,
      };
    }
    return newNode;
  };

  const nodeClickHandler = useCallback(
    (node: Node | null) => {
      setNodes((prev) => {
        const newNode = createNode(node, `${prev.length}`);
        if (node) {
          setEdges((prev) =>
            addEdge(
              {
                id: `${node.id}-${newNode.id}`,
                source: node.id,
                target: newNode.id,
                sourceHandle: "a",
                targetHandle: "b",
              },
              prev
            )
          );
        }
        return [...prev, newNode];
      });
    },
    [setEdges, setNodes]
  );

  const nodesChangeHandler: OnNodesChange = useCallback(
    async (nodeChanges) => {
      onNodesChange(nodeChanges);
      if (nodesLengthRef.current !== nodes.length) {
        const newNodes = await createGraphLayout(nodes, edges);
        setNodes(newNodes);
        nodesLengthRef.current = nodes.length;
      }
      // TODO: mejorar
      setTimeout(() => {
        fitViewRef.current();
      }, 500);
    },
    [edges, nodes, setNodes, onNodesChange]
  );

  return (
    <>
      <button onClick={() => nodeClickHandler(null)}>Create node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={nodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        onNodeClick={(e, node) => nodeClickHandler(node)}
        snapToGrid={true}
        defaultZoom={1.5}
        fitView
        // attributionPosition="bottom-left"
      ></ReactFlow>
    </>
  );
};

export default UpdateNode;

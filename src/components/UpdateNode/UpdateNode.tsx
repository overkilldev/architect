import { useCallback, useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "react-flow-renderer";
import { ReactFlowInstance } from "react-flow-renderer";
import { addEdge, Connection } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { createGraphLayout } from "../../utils";
import CustomNode from "../CustomNode/CustomNode";

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const onConnect = useCallback(
    (params: Connection) => {
      return setEdges((edges) => addEdge({ ...params }, edges));
    },
    [setEdges]
  );

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    createGraphLayout(
      reactFlowInstance.getNodes(),
      reactFlowInstance.getEdges()
    )
      .then((els) => setNodes(els))
      .catch((err) => console.error(err));
    reactFlowInstance.fitView();
  };

  const createNode = (parentNode: Node | null, id: string): Node => {
    const newNode = {
      id,
      type: "customNode",
      data: {
        label: `Node ${id}`,
      },
      position: { x: 0, y: 0 },
    };
    if (parentNode) {
      const { position } = parentNode;
      newNode.position = {
        // @ts-ignore
        x: position.x - parentNode.width / 2 + Math.random() / 1000,
        // @ts-ignore
        y: position.y - parentNode.height / 2,
      };
    }
    return newNode;
  };

  const nodeClickHandler = (node: Node | null) => {
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
  };

  return (
    <>
      <button onClick={() => nodeClickHandler(null)}>Create node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        onNodeClick={(e, node) => nodeClickHandler(node)}
        snapToGrid={true}
        defaultZoom={1.5}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </>
  );
};

export default UpdateNode;

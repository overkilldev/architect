import Elk, { ElkNode, ElkExtendedEdge } from "elkjs";
import { Node, Edge } from "react-flow-renderer";

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 30;

const elk = new Elk({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.spacing.nodeNode": "50",
    "elk.layered.spacing.nodeNodeBetweenLayers": "100",
    "elk.layered.crossingMinimization.strategy": "INTERACTIVE",
    "elk.edgeRouting": "SPLINES"
  }
});

export const calculateLayout = (flowNode: Node, graph: ElkNode) => {
  const node = graph?.children?.find(n => n.id === flowNode.id);
  if (!node) return flowNode;
  const { x, y, width, height } = node;
  if (x && y && width && height) {
    flowNode.position = {
      x: x - width,
      y: y - height
    };
  } else {
    console.log("error", node);
  }

  return flowNode;
};

export const createGraphLayout = async (
  nodes: Array<Node>,
  edges: Array<Edge>
): Promise<Array<Node>> => {
  const elkNodes: ElkNode[] = [];
  const elkEdges: ElkExtendedEdge[] = [];

  nodes.forEach(flowNode => {
    elkNodes.push({
      id: flowNode.id,
      width: flowNode.width ?? DEFAULT_WIDTH,
      height: flowNode.height ?? DEFAULT_HEIGHT
    });
  });
  edges.forEach(flowEdge => {
    elkEdges.push({
      id: flowEdge.id,
      targets: [flowEdge.target],
      sources: [flowEdge.source]
    });
  });

  const newGraph = await elk.layout({
    id: "root",
    children: elkNodes,
    edges: elkEdges
  });
  return nodes.map(flowNode => calculateLayout(flowNode, newGraph));
};

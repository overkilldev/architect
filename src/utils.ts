import Elk, { ElkNode, ElkPrimitiveEdge } from "elkjs";
import { Node, Edge } from "react-flow-renderer";

/* From https://github.com/wbkd/react-flow/issues/5#issuecomment-954001434 */
/* 
Get a sense of the parameters at:
https://rtsys.informatik.uni-kiel.de/elklive/examples.html?e=general%2Fspacing%2FnodesEdges 
*/

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 30;
const DEFAULT_WIDTH_FOR_ROOT = 50;

const elk = new Elk({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.spacing.nodeNode": "100",
    "elk.layered.spacing.nodeNodeBetweenLayers": "100",
    "elk.layered.crossingMinimization.strategy": "INTERACTIVE",
  },
});

export const calculateLayout = (flowNode: Node, graph: ElkNode) => {
  const node = graph?.children?.find((n) => n.id === flowNode.id);
  if (!node) return flowNode;
  const { x, y, width, height } = node;
  if (x && y && width && height) {
    flowNode.position = {
      x: x - width,
      y: y - height,
    };
  } else {
    console.log("error? ");
  }
  return flowNode;
};

export const createGraphLayout = async (
  nodes: Array<Node>,
  edges: Array<Edge>
): Promise<Array<Node>> => {
  const elkNodes: ElkNode[] = [];
  const elkEdges: ElkPrimitiveEdge[] = [];

  nodes.forEach((flowNode) => {
    elkNodes.push({
      id: flowNode.id,
      width:
        flowNode.id === "0"
          ? DEFAULT_WIDTH_FOR_ROOT
          : flowNode.width ?? DEFAULT_WIDTH,
      height: flowNode.height ?? DEFAULT_HEIGHT,
    });
  });

  edges.forEach((flowEdge) => {
    elkEdges.push({
      id: flowEdge.id,
      target: flowEdge.target,
      source: flowEdge.source,
    });
  });

  const newGraph = await elk.layout({
    id: "root",
    children: elkNodes,
    edges: elkEdges,
  });

  return nodes.map((flowNode) => calculateLayout(flowNode, newGraph));
};

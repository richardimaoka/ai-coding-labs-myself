import { Graph, Node, Edge } from "./types";

export function addNode(graph: Graph, node: Node): Graph {
  if (graph.__nodes.some((n) => n.id === node.id)) {
    return graph; // Node already exists, return original graph
  }
  return {
    ...graph,
    __nodes: [...graph.__nodes, node],
  };
}

export function addEdge(graph: Graph, edge: Edge): Graph {
  if (
    graph.edges.some(
      (e) =>
        e.from === edge.from && e.to === edge.to && e.weight === edge.weight
    )
  ) {
    return graph; // Edge already exists, return original graph
  }
  return {
    ...graph,
    edges: [...graph.edges, edge],
  };
}

export function addNeighbors(
  graph: Graph,
  nodeId: string,
  neighborIds: string[],
  defaultWeight: number = 1
): Graph {
  let newGraph = { ...graph };
  for (const neighborId of neighborIds) {
    const newEdge: Edge = {
      from: nodeId,
      to: neighborId,
      weight: defaultWeight,
    };
    newGraph = addEdge(newGraph, newEdge);
  }
  return newGraph;
}

export function getNodes(graph: Graph): Node[] {
  return graph.__nodes;
}

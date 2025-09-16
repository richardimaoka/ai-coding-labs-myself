import { Graph, Node, Edge } from "./types";

export function emptyGraph(): Graph {
  return {
    nodes: [],
    edges: [],
  };
}

export function addNode(graph: Graph, node: Node): Graph {
  if (graph.nodes.some((n) => n.id === node.id)) {
    throw new Error(`Node with id ${node.id} already exists.`);
  }
  return {
    ...graph,
    nodes: [...graph.nodes, node],
  };
}

export function edgeEqual(edge1: Edge, edge2: Edge): boolean {
  if (edge1.weight !== edge2.weight) {
    return false;
  }

  // The order of node1/node2 doesn't matter
  return (
    (edge1.node1 === edge2.node1 && edge1.node2 === edge2.node2) ||
    (edge1.node2 === edge2.node1 && edge1.node1 === edge2.node2)
  );
}

export function newEdge(
  nodeId1: string,
  nodeId2: string,
  weight: number
): Edge {
  return { node1: nodeId1, node2: nodeId2, weight: weight };
}

export function addEdge(
  graph: Graph,
  nodeId1: string,
  nodeId2: string,
  weight: number
): Graph {
  if (!graph.nodes.some((n) => n.id === nodeId1)) {
    throw new Error(`Node with id ${nodeId1} does not exist in the graph.`);
  }
  if (!graph.nodes.some((n) => n.id === nodeId2)) {
    throw new Error(`Node with id ${nodeId2} does not exist in the graph.`);
  }

  const edgeToAdd = newEdge(nodeId1, nodeId2, weight);

  if (graph.edges.some((e) => edgeEqual(e, edgeToAdd))) {
    throw new Error(
      `Edge with nodes [${nodeId1}, ${nodeId2}] with weight ${weight} already exists.`
    );
  }

  return {
    ...graph,
    edges: [...graph.edges, edgeToAdd],
  };
}

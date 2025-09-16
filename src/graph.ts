import { Graph, Node, Edge } from './types';

export function emptyGraph(): Graph {
  return {
    nodes: [],
    edges: [],
  };
}

export function addNode(graph: Graph, node: Node): Graph {
  if (graph.nodes.some(n => n.id === node.id)) {
    throw new Error(`Node with id ${node.id} already exists.`);
  }
  return {
    ...graph,
    nodes: [...graph.nodes, node],
  };
}

export function addEdge(graph: Graph, edge: Edge): Graph {
  if (graph.edges.some(e => e.from === edge.from && e.to === edge.to && e.weight === edge.weight)) {
    return graph; // Edge already exists, return original graph
  }
  return {
    ...graph,
    edges: [...graph.edges, edge],
  };
}
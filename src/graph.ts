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
  if (!graph.nodes.some(n => n.id === edge.from)) {
    throw new Error(`Node with id ${edge.from} does not exist in the graph.`);
  }
  if (!graph.nodes.some(n => n.id === edge.to)) {
    throw new Error(`Node with id ${edge.to} does not exist in the graph.`);
  }
  if (graph.edges.some(e => e.from === edge.from && e.to === edge.to && e.weight === edge.weight)) {
    throw new Error(`Edge from ${edge.from} to ${edge.to} with weight ${edge.weight} already exists.`);
  }
  return {
    ...graph,
    edges: [...graph.edges, edge],
  };
}
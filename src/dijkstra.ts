import { Graph, Edge } from "./types";

export function dijkstra(
  graph: Graph,
  startNodeId: string,
  endNodeId: string
): { path: string[]; distance: number } {
  const distances: { [nodeId: string]: number } = {};
  const previousNodes: { [nodeId: string]: string | null } = {};
  const unvisitedNodes = new Set<string>();

  // Initialize distances and previousNodes
  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    previousNodes[node.id] = null;
    unvisitedNodes.add(node.id);
  }

  if (!unvisitedNodes.has(startNodeId)) {
    throw new Error(`Start node ${startNodeId} not found in graph.`);
  }
  if (!unvisitedNodes.has(endNodeId)) {
    throw new Error(`End node ${endNodeId} not found in graph.`);
  }

  distances[startNodeId] = 0;

  while (unvisitedNodes.size > 0) {
    // Find the unvisited node with the smallest distance
    let currentNodeId: string | null = null;
    let minDistance = Infinity;

    for (const nodeId of unvisitedNodes) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        currentNodeId = nodeId;
      }
    }

    if (currentNodeId === null) {
      break; // All remaining unvisited nodes are unreachable
    }

    unvisitedNodes.delete(currentNodeId);

    if (currentNodeId === endNodeId) {
      break; // Found the shortest path to the end node
    }

    // Get neighbors of the current node
    const neighbors: { nodeId: string; weight: number }[] = [];
    for (const edge of graph.edges) {
      if (edge.node1 === currentNodeId) {
        neighbors.push({ nodeId: edge.node2, weight: edge.weight });
      } else if (edge.node2 === currentNodeId) {
        neighbors.push({ nodeId: edge.node1, weight: edge.weight });
      }
    }

    for (const neighbor of neighbors) {
      const newDistance = distances[currentNodeId] + neighbor.weight;
      if (newDistance < distances[neighbor.nodeId]) {
        distances[neighbor.nodeId] = newDistance;
        previousNodes[neighbor.nodeId] = currentNodeId;
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let currentNode: string | null = endNodeId;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previousNodes[currentNode];
    if (currentNode === startNodeId && path[0] === startNodeId) {
      break;
    }
    if (currentNode === null && path[0] !== startNodeId) {
      // If we reached the start of the path and it's not the startNodeId,
      // or if we couldn't find a path back to the startNodeId
      return { path: [], distance: Infinity };
    }
  }

  if (path[0] !== startNodeId || path[path.length - 1] !== endNodeId) {
    return { path: [], distance: Infinity };
  }

  return { path, distance: distances[endNodeId] };
}

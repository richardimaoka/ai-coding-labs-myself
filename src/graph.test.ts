import { describe, it, expect, beforeEach } from 'vitest';
import { Graph, Node, Edge } from './types';
import { addNode, addEdge, addNeighbors, getNodes } from './graph';

describe('Graph functions', () => {
  let initialGraph: Graph;

  beforeEach(() => {
    initialGraph = {
      nodes: [],
      edges: [],
    };
  });

  describe('addNode', () => {
    it('should add a new node to the graph', () => {
      const node1: Node = { id: 'A' };
      const newGraph = addNode(initialGraph, node1);

      expect(newGraph.nodes).toHaveLength(1);
      expect(newGraph.nodes[0]).toEqual(node1);
      expect(newGraph).not.toBe(initialGraph); // Ensure immutability
      expect(initialGraph.nodes).toHaveLength(0); // Original graph should be unchanged
    });

    it('should not add a duplicate node', () => {
      const node1: Node = { id: 'A' };
      let newGraph = addNode(initialGraph, node1);
      newGraph = addNode(newGraph, node1);

      expect(newGraph.nodes).toHaveLength(1);
    });
  });

  describe('addEdge', () => {
    it('should add a new edge to the graph', () => {
      const edge1: Edge = { from: 'A', to: 'B', weight: 1 };
      const newGraph = addEdge(initialGraph, edge1);

      expect(newGraph.edges).toHaveLength(1);
      expect(newGraph.edges[0]).toEqual(edge1);
      expect(newGraph).not.toBe(initialGraph); // Ensure immutability
      expect(initialGraph.edges).toHaveLength(0); // Original graph should be unchanged
    });

    it('should not add a duplicate edge', () => {
      const edge1: Edge = { from: 'A', to: 'B', weight: 1 };
      let newGraph = addEdge(initialGraph, edge1);
      newGraph = addEdge(newGraph, edge1);

      expect(newGraph.edges).toHaveLength(1);
    });
  });

  describe('addNeighbors', () => {
    it('should add edges for each neighbor with default weight', () => {
      const nodeA: Node = { id: 'A' };
      const nodeB: Node = { id: 'B' };
      const nodeC: Node = { id: 'C' };

      let graphWithNodes = addNode(initialGraph, nodeA);
      graphWithNodes = addNode(graphWithNodes, nodeB);
      graphWithNodes = addNode(graphWithNodes, nodeC);

      const newGraph = addNeighbors(graphWithNodes, 'A', ['B', 'C']);

      expect(newGraph.edges).toHaveLength(2);
      expect(newGraph.edges).toContainEqual({ from: 'A', to: 'B', weight: 1 });
      expect(newGraph.edges).toContainEqual({ from: 'A', to: 'C', weight: 1 });
      expect(newGraph).not.toBe(graphWithNodes); // Ensure immutability
    });

    it('should not add duplicate edges when adding neighbors', () => {
      const nodeA: Node = { id: 'A' };
      const nodeB: Node = { id: 'B' };

      let graphWithNodes = addNode(initialGraph, nodeA);
      graphWithNodes = addNode(graphWithNodes, nodeB);

      let newGraph = addNeighbors(graphWithNodes, 'A', ['B']);
      newGraph = addNeighbors(newGraph, 'A', ['B']);

      expect(newGraph.edges).toHaveLength(1);
      expect(newGraph.edges).toContainEqual({ from: 'A', to: 'B', weight: 1 });
    });
  });

  describe('getNodes', () => {
    it('should return all nodes in the graph', () => {
      const node1: Node = { id: 'X' };
      const node2: Node = { id: 'Y' };
      let newGraph = addNode(initialGraph, node1);
      newGraph = addNode(newGraph, node2);

      const nodes = getNodes(newGraph);
      expect(nodes).toHaveLength(2);
      expect(nodes).toContainEqual(node1);
      expect(nodes).toContainEqual(node2);
    });

    it('should return an empty array if no nodes are present', () => {
      const nodes = getNodes(initialGraph);
      expect(nodes).toHaveLength(0);
    });
  });
});

import { describe, expect, it } from "vitest";
import { addEdge, addNode, emptyGraph } from "./graph";
import { Edge, Node } from "./types";

describe("Graph functions", () => {
  describe("addNode", () => {
    it("should add a new node to the graph", () => {
      const graph = emptyGraph();
      const node1: Node = { id: "A" };
      const newGraph = addNode(graph, node1);

      expect(newGraph.nodes).toHaveLength(1);
      expect(newGraph.nodes[0]).toEqual(node1);
      expect(newGraph).not.toBe(graph); // Ensure immutability
    });

    it("should not add a duplicate node", () => {
      const graph = emptyGraph();
      const node1: Node = { id: "A" };
      const newGraph = addNode(graph, node1);

      expect(newGraph.nodes).toHaveLength(1);

      expect(() => addNode(newGraph, node1)).toThrowError(
        `Node with id ${node1.id} already exists.`
      );
    });
  });

  describe("addEdge", () => {
    it("should add a new edge to the graph", () => {
      let graph = emptyGraph();
      const nodeA: Node = { id: "A" };
      const nodeB: Node = { id: "B" };
      graph = addNode(graph, nodeA);
      graph = addNode(graph, nodeB);

      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      const newGraph = addEdge(graph, edge1);

      expect(newGraph.edges).toHaveLength(1);
      expect(newGraph.edges[0]).toEqual(edge1);
      expect(newGraph).not.toBe(graph); // Ensure immutability
    });

    it("should throw an error if a duplicate edge is added", () => {
      let graph = emptyGraph();
      const nodeA: Node = { id: "A" };
      const nodeB: Node = { id: "B" };
      graph = addNode(graph, nodeA);
      graph = addNode(graph, nodeB);

      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      let newGraph = addEdge(graph, edge1);

      expect(() => addEdge(newGraph, edge1)).toThrowError(`Edge from ${edge1.from} to ${edge1.to} with weight ${edge1.weight} already exists.`);
    });

    it("should throw an error if edge.from node does not exist", () => {
      let graph = emptyGraph();
      const nodeB: Node = { id: "B" };
      graph = addNode(graph, nodeB);

      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      expect(() => addEdge(graph, edge1)).toThrowError(`Node with id ${edge1.from} does not exist in the graph.`);
    });

    it("should throw an error if edge.to node does not exist", () => {
      let graph = emptyGraph();
      const nodeA: Node = { id: "A" };
      graph = addNode(graph, nodeA);

      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      expect(() => addEdge(graph, edge1)).toThrowError(`Node with id ${edge1.to} does not exist in the graph.`);
    });
});

});
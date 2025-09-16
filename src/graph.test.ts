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
      let newGraph = addNode(graph, node1);
      newGraph = addNode(newGraph, node1);

      expect(newGraph.nodes).toHaveLength(1);
    });
  });

  describe("addEdge", () => {
    it("should add a new edge to the graph", () => {
      const graph = emptyGraph();
      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      const newGraph = addEdge(graph, edge1);

      expect(newGraph.edges).toHaveLength(1);
      expect(newGraph.edges[0]).toEqual(edge1);
      expect(newGraph).not.toBe(graph); // Ensure immutability
    });

    it("should not add a duplicate edge", () => {
      const graph = emptyGraph();
      const edge1: Edge = { from: "A", to: "B", weight: 1 };
      let newGraph = addEdge(graph, edge1);
      newGraph = addEdge(newGraph, edge1);

      expect(newGraph.edges).toHaveLength(1);
    });
  });
});

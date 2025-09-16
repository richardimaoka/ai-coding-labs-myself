import { describe, expect, it } from "vitest";
import { addEdge, addNode, emptyGraph, newEdge } from "./graph";
import { Node } from "./types";

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

      const newGraph = addEdge(graph, "A", "B", 1);

      expect(newGraph.edges).toHaveLength(1);
      expect(newGraph.edges[0]).toEqual(newEdge("A", "B", 1));
      expect(newGraph).not.toBe(graph); // Ensure immutability
    });

    it("should throw an error if a duplicate edge is added", () => {
      let graph = emptyGraph();
      const nodeA: Node = { id: "A" };
      const nodeB: Node = { id: "B" };
      graph = addNode(graph, nodeA);
      graph = addNode(graph, nodeB);

      let newGraph = addEdge(graph, "A", "B", 1);

      expect(() => addEdge(newGraph, "A", "B", 1)).toThrowError(
        `Edge with nodes [A, B] with weight 1 already exists.`
      );
    });

    it("should throw an error if node does not exist", () => {
      let graph = emptyGraph();
      const nodeB: Node = { id: "B" };
      graph = addNode(graph, nodeB);

      expect(() => addEdge(graph, "A", "B", 1)).toThrowError(
        `Node with id A does not exist in the graph.`
      );
    });
  });
});

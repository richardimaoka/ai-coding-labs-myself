import { describe, expect, it } from "vitest";
import { addEdge, addNode, emptyGraph, newEdge } from "./graph";
import { Node } from "./types";
import { dijkstra } from "./dijkstra";

describe("dijkstra", () => {
  it("should find shortest path in a simple linear graph (A→B→C)", () => {
    let graph = emptyGraph();
    const nodeA: Node = { id: "A" };
    const nodeB: Node = { id: "B" };
    const nodeC: Node = { id: "C" };

    graph = addNode(graph, nodeA);
    graph = addNode(graph, nodeB);
    graph = addNode(graph, nodeC);

    graph = addEdge(graph, "A", "B", 1);
    graph = addEdge(graph, "B", "C", 1);

    const resultAA = dijkstra(graph, "A", "A");
    expect(resultAA).toEqual({ path: ["A"], distance: 0 });

    const resultAB = dijkstra(graph, "A", "B");
    expect(resultAB).toEqual({ path: ["A", "B"], distance: 1 });

    const resultAC = dijkstra(graph, "A", "C");
    expect(resultAC).toEqual({ path: ["A", "B", "C"], distance: 2 });
  });

  it("should find shortest path in a more complex graph with 5 nodes A, B, C, D and E", () => {
    let graph = emptyGraph();
    const nodeA: Node = { id: "A" };
    const nodeB: Node = { id: "B" };
    const nodeC: Node = { id: "C" };
    const nodeD: Node = { id: "D" };
    const nodeE: Node = { id: "E" };

    graph = addNode(graph, nodeA);
    graph = addNode(graph, nodeB);
    graph = addNode(graph, nodeC);
    graph = addNode(graph, nodeD);
    graph = addNode(graph, nodeE);

    graph = addEdge(graph, "A", "B", 1);
    graph = addEdge(graph, "B", "C", 2);
    graph = addEdge(graph, "A", "D", 3);
    graph = addEdge(graph, "D", "E", 1);
    graph = addEdge(graph, "C", "E", 1);

    const result = dijkstra(graph, "A", "E");
    expect(result).toEqual({ path: ["A", "B", "C", "E"], distance: 4 });
  });

  it("should choose the shortest path when multiple paths exist", () => {
    let graph = emptyGraph();
    const nodeA: Node = { id: "A" };
    const nodeB: Node = { id: "B" };
    const nodeC: Node = { id: "C" };
    const nodeD: Node = { id: "D" };

    graph = addNode(graph, nodeA);
    graph = addNode(graph, nodeB);
    graph = addNode(graph, nodeC);
    graph = addNode(graph, nodeD);

    graph = addEdge(graph, "A", "B", 1);
    graph = addEdge(graph, "A", "C", 5);
    graph = addEdge(graph, "B", "D", 3);
    graph = addEdge(graph, "C", "D", 1);

    const result = dijkstra(graph, "A", "D");
    expect(result).toEqual({ path: ["A", "B", "D"], distance: 4 });
  });

  it("should throw an error if the start node does not exist in the graph", () => {
    const graph = emptyGraph();
    expect(() => dijkstra(graph, "A", "B")).toThrowError(
      "Start node A not found in graph."
    );
  });

  it("should throw an error if the end node does not exist in the graph", () => {
    let graph = emptyGraph();
    const nodeA: Node = { id: "A" };
    graph = addNode(graph, nodeA);
    expect(() => dijkstra(graph, "A", "B")).toThrowError(
      "End node B not found in graph."
    );
  });

  it("should return an empty path and infinite distance for an unreachable node", () => {
    let graph = emptyGraph();
    const nodeA: Node = { id: "A" };
    const nodeB: Node = { id: "B" };
    graph = addNode(graph, nodeA);
    graph = addNode(graph, nodeB);
    const result = dijkstra(graph, "A", "B");
    expect(result).toEqual({ path: [], distance: Infinity });
  });
});

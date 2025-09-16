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

    const result = dijkstra(graph, "A", "C");

    expect(result).toEqual({ path: ["A", "B", "C"], distance: 2 });
  });
});

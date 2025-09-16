export type Node = {
  id: string;
};

export type Edge = {
  from: string; // Node ID of edge's start
  to: string; // Node ID of edge's end
  weight: number;
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};
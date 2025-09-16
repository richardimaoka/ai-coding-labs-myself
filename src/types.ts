export type Node = {
  id: string;
};

export type Edge = {
  node1: string; // Node ID
  node2: string; // Node ID
  weight: number;
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

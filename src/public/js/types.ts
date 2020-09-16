export type NodeType = {
  name: string;
  description: string;
  parent: string;
  children: string[];
  depth?: number;
};

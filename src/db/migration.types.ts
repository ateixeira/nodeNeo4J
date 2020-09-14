export type DataNode = {
  name: string;
  description: string;
  parentId?: string;
  parent?: string;
};

export type DataTree = {
  data: DataNode[];
};

export type LoadDataResult = {
  success: boolean;
  count: number;
};

export type RemoveDataResult = {
  success: boolean;
  count: number;
};

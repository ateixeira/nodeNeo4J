/* eslint-disable no-undef */
import Component from './component';
import TreeNode from './node';
import { NodeType } from './types';

export class Tree extends Component {
  readonly element: HTMLElement;

  private readonly nodes: NodeType[];

  constructor(nodes: NodeType[]) {
    super();
    this.element = document.createElement('div');
    this.nodes = nodes;
    this.renderTree();
  }

  private createNode(n: NodeType) {
    const node = new TreeNode(n);
    node.render(this.element);
  }

  public renderTree() {
    this.nodes.map((n: NodeType) => {
      this.createNode(n);
    });
  }
}

export default Node;

/* eslint-disable no-undef */
import Component from './component';

type NodeType = {
  name: string;
};

class Node extends Component {
  readonly element: HTMLElement;

  constructor(node: NodeType) {
    super();
    this.element = document.createElement('div');
    const nodeContent = document.createTextNode(node.name);
    this.element.appendChild(nodeContent);
  }
}

export default Node;

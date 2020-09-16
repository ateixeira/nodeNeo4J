/* eslint-disable no-undef */
import Component from './component';
import { NodeType } from './types';

class TreeNode extends Component {
  readonly element: HTMLElement;

  readonly data: NodeType;

  constructor(node: NodeType) {
    super();
    this.data = node;
    this.element = document.createElement('ul');
    const nodeLi = document.createElement('li');
    this.element.className = 'node';
    const nodeContent = document.createTextNode(node.name);
    nodeLi.appendChild(nodeContent);
    this.element.appendChild(nodeLi);
  }
}

export default TreeNode;

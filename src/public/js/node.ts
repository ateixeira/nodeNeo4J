/* eslint-disable no-undef */
import Component from './component';
import { NodeType } from './types';

class TreeNode extends Component {
  readonly element: HTMLElement;

  readonly data: NodeType;

  private readonly store;

  constructor(node: NodeType, store: any) {
    super();
    this.store = store;
    this.data = node;
    this.element = document.createElement('ul');
    this.configNode();
  }

  private configNode() {
    const nodeLi = document.createElement('li');
    this.element.className = 'node';
    const nodeContent = document.createTextNode(this.data.name);
    nodeLi.appendChild(nodeContent);
    nodeLi.addEventListener('click', () => {
      this.store.selectNode(nodeLi);
    });
    this.element.appendChild(nodeLi);
    if (this.data.children.length) {
      nodeLi.className = 'has-child';
    }
  }
}

export default TreeNode;

/* eslint-disable no-undef */
import Component from './component';
import TreeNode from './node';
import { NodeType } from './types';

export class Tree extends Component {
  readonly element: HTMLElement;

  private readonly nodes: NodeType[];

  private readonly nodesMap: Map<string, NodeType>;

  constructor(nodes: NodeType[]) {
    super();
    this.element = document.createElement('ul');
    this.element.className = 'tree';
    this.nodes = nodes;
    this.nodesMap = new Map();
    this.buildNodesMap();
    this.renderTree();
  }

  private buildNodesMap() {
    this.nodes.map((n: NodeType) => {
      this.nodesMap.set(n.name, n);
    });
  }

  private createNode(n: NodeType, target?: HTMLElement) {
    const node = new TreeNode(n);
    node.render(target || this.element);
    return node;
  }

  private findTopNodes() {
    return this.nodes.filter((e) => !e.parent);
  }

  private hasChildren(node: TreeNode) {
    return !!node.data.children.length;
  }

  private createColumn() {
    const newColumn = document.createElement('div');
    newColumn.className = 'column';
    this.element.appendChild(newColumn);
    return newColumn;
  }

  private renderChildrenNodes(treeNode: TreeNode, depth: number = 1) {
    console.log('!!!!!!!!!!!!!!!!!!!! COMECO !!!!!!!!!!!!!!');
    console.log('Hora de criar os childs');
    console.log('treeNode');
    console.log(treeNode);
    if (this.hasChildren(treeNode)) {
      const newColumn = document.createElement('div');
      // const newColumn = this.createColumn();
      console.log('this.nodes');
      console.log(this.nodes);
      console.log('this.nodesMap');
      console.log(this.nodesMap);
      treeNode.data.children.map((child: string) => {
        console.log('child');
        console.log(child);
        const childData = this.nodesMap.get(child);
        console.log('childData');
        console.log(childData);
        console.log('########### FIM ################');

        if (childData) {
          childData.depth = depth;
          const newNode = this.createNode(childData, treeNode.element);
          this.renderChildrenNodes(newNode, depth + 1);
        }
      });
    }
  }

  public renderTree() {
    // const baseColumn = this.createColumn();

    const topNodes = this.findTopNodes().map((n: NodeType) => {
      return this.createNode(n);
    });
    console.log('topNodes');
    console.log(topNodes);
    topNodes.map((n: TreeNode) => {
      if (this.hasChildren(n)) {
        this.renderChildrenNodes(n);
      }
    });
  }
}

export default Node;

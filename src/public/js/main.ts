import { NodeType } from './types';
import Api from './api';
import { Tree } from './tree';
import '../css/style.scss';

const appElement = document.getElementById('app');

class Store {
  private selectedNode: NodeType | undefined;

  constructor() {
    this.selectedNode = undefined;
  }

  public selectNode(x: NodeType) {
    this.selectedNode = x;
  }
}

const renderApp = async () => {
  const store = new Store();
  const data = await Api.getTree('http://localhost:3009/api/tree');
  if (appElement !== null) {
    appElement.innerHTML = '';
    console.log(store);
    const tree = new Tree(data.nodes, store);
    tree.render(appElement);
  }
};

renderApp();

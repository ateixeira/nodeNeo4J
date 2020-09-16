import Node from './node';
import Api from './api';
import { NodeType } from './types';

const appElement = document.getElementById('app');

const renderApp = async () => {
  const data = await Api.getTree('http://localhost:3009/api/tree');
  if (appElement !== null) {
    appElement.innerHTML = '';
    data.nodes.forEach((n: NodeType) => {
      const node = new Node(n);
      node.render(appElement);
    });
  }
};

renderApp();

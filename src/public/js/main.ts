import Api from './api';
import { Tree } from './tree';

const appElement = document.getElementById('app');

const renderApp = async () => {
  const data = await Api.getTree('http://localhost:3009/api/tree');
  if (appElement !== null) {
    appElement.innerHTML = '';
    const tree = new Tree(data.nodes);
    tree.render(appElement);
  }
};

renderApp();

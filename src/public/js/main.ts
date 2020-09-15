import Node from './node';

const appElement = document.getElementById('app');

const node = new Node({ name: 'Node One' });

function renderApp() {
  if (appElement !== null) {
    appElement.innerHTML = '';
    node.render(appElement);
  }
}

renderApp();

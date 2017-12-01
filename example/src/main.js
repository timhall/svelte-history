import { Store } from 'svelte/store';
import { createBrowserHistory } from '../../';
import App from './App.html';

const store = new Store();
const history = new createBrowserHistory();
history.connectTo(store);

const app = new App({
  target: document.getElementById('app'),
  store
});

export default app;

import { Store } from 'svelte/store';
import { createHashHistory } from '../../';
import App from './App.html';

const store = new Store();
const history = new createHashHistory();
history.connectTo(store);

const app = new App({
  target: document.body,
  store
});

export default app;

import { Store } from 'svelte/store';
import { HashHistory as History } from '../../';
import App from './App.html';

const store = new Store();
window.store = store;

const history = new History();
history.connectTo(store);
window._history = history;

const app = new App({
  target: document.body,
  store
});

export default app;

import { Store } from 'svelte/store';
import { HashRouter } from './svelte-router';
import App from './App.html';

const store = new Store({
  name: 'world',
});
window.store = store;

const router = new HashRouter();
router.connectTo(store);

const app = new App({
  target: document.body,
  store
});

export default app;

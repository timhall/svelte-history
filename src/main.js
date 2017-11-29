import { Store } from 'svelte/store';
import { HashRouter as Router } from './svelte-router';
import App from './App.html';

const store = new Store();
window.store = store;

const router = new Router();
router.connectTo(store);
window.router = router;

const app = new App({
  target: document.body,
  store
});

export default app;

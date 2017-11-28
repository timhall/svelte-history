import { Store } from 'svelte/store';
import { BrowserRouter as Router } from './svelte-router';
import App from './App.html';

const store = new Store({
  name: 'world',
});
window.store = store;

const router = new Router();
router.connectTo(store);
window.router = router;

const app = new App({
  target: document.body,
  store
});

export default app;

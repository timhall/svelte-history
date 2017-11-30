export { default as match } from './match';
export { default as History } from './history';

export { default as BrowserHistory } from './browser-history';
export { default as HashHistory } from './hash-history';
export { default as MemoryHistory } from './memory-history';

// Unclear on the best approach for distributing svelte components
// for now, import and compile directly (to prevent duplicate helpers) with:
//
// import Link from 'svelte-history/Link.html'
// import Route from 'svelte-history/Route.html';
// import Redirect from 'svelte-history/Redirect.html';
//
// These will most likely be enabled once a clear distribution/tree-shaking story is avaiable
//
// export { default as Link } from '../Link.html';
// export { default as Route } from '../Route.html';
// export { default as Redirect } from '../Redirect.html';

export function push(path) {
  getHistory(this).push(path);
}

export function replace(path) {
  getHistory(this).replace(path);
}

export function go(n) {
  getHistory(this).go(n);
}

export function goBack() {
  getHistory(this).goBack();
}

export function goForward() {
  getHistory(this).goForward();
}

export function getHistory(context) {
  return context.store.get('history');
}

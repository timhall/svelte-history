export { default as match } from './match';
export {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from './history';

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

export function toRoutes($history, mapping) {
  return Object.keys(mapping).reduce((memo, key) => {
    memo[key] = $history.match(mapping[key]);
    return memo;
  }, {});
}

// Unclear on the best approach for distributing svelte components
// for now, import and compile directly (to prevent duplicate helpers) with:
//
// import Link from 'svelte-history/Link.html'
// import Route from 'svelte-history/Route.html';
// import Redirect from 'svelte-history/Redirect.html';
//
// These will most likely be enabled once a clear distribution/tree-shaking story is available
//
// export { default as Link } from '../Link.html';
// export { default as Route } from '../Route.html';
// export { default as Redirect } from '../Redirect.html';

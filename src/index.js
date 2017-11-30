export { default as match } from './match';
export { default as BrowserHistory } from './browser-history';
export { default as HashHistory } from './hash-history';
export { default as MemoryHistory } from './memory-history';

export { default as Link } from './Link.html';
export { default as Route } from './Route.html';
export { default as Redirect } from './Redirect.html';

export function push(path) {
  const history = this.store.get('history');
  history.push(path);
}

export function replace(path) {
  const history = this.store.get('history');
  history.replace(path);
}

export function go(n) {
  const history = this.store.get('history');
  history.go(n);
}

export function goBack() {
  const history = this.store.get('history');
  history.goBack();
}

export function goForward() {
  const history = this.store.get('history');
  history.goForward();
}

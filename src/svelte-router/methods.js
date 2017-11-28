export function push(path, router = getRouter(this)) {
  if (!router) return;
  router.push(path);
}

export function replace(path, router = getRouter(this)) {
  if (!router) return;
  router.replace(path);
}

export function go(n, router = getRouter(this)) {
  if (!router) return;
  router.go(n);
}

export function goBack(router = getRouter(this)) {
  if (!router) return;
  router.goBack();
}

export function goForward(router = getRouter(this)) {
  if (!router) return;
  router.goForward();
}

export function getRouter(component) {
  return component.get('router') || (component.store && component.store.get('router'));
}

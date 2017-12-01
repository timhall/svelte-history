import {
  createLocation,
  createBrowserHistory as browser,
  createHashHistory as hash,
  createMemoryHistory as memory
} from 'history';
import match from './match';

export function createBrowserHistory(options) {
  return prepareHistory(browser(options));
}

export function createHashHistory(options) {
  return prepareHistory(hash(options));
}

export function createMemoryHistory(options) {
  return prepareHistory(memory(options));
}

function prepareHistory(history) {
  history.match = (path, options = {}) => {
    const { exact = false } = options;
    return match(history.location.pathname, { path, exact });
  };

  const createHref = history.createHref;
  history.createHref = path => {
    const location =
      typeof path === 'string'
        ? createLocation(path, null, null, history.location)
        : path;

    return createHref(location);
  };

  history.connectTo = stateful => {
    stateful.set({ history });
    return history.listen(() => stateful.set({ history }));
  };

  return history;
}

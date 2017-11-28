import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import { Store } from 'svelte/store';

export function createRouter(createHistory) {
  return class extends Store {
    constructor(options) {
      super();

      this.connections = [];
      this.options = options;
      this.history = createHistory(options);

      this.history.listen(location => this.onChange(location));
      this.onChange(this.history.location);
    }

    get url() {
      return this.history.location.pathname;
    }
  
    match(pattern) {
      return pattern.match(this.url) !== null;
    }
  
    push(path) {
      this.history.push(path);
    }
    replace(path) {
      this.history.replace(path);
    }
    go(n) {
      this.history.go(n);
    }
    goBack() {
      this.history.goBack();
    }
    goForward() {
      this.history.goForward();
    }
  
    toHref(url) {
      const location = { pathname: url };
      return this.history.createHref(location);
    }
  
    connectTo(stateful, options = {}) {
      const { init = true } = options;
  
      this.connections.push(stateful);
      if (init) stateful.set({ router: this });
    }
  
    onChange(location) {
      console.log('onChange', location);
      this.set({ location });
      this.connections.forEach(connection => {
        connection.set({ router: this })
      });
    }
  }
}

// TODO Look into better separation for npm/browser loading
export const BrowserRouter = createRouter(createBrowserHistory);
export const HashRouter = createRouter(createHashHistory);
export const MemoryRouter = createRouter(createMemoryHistory);

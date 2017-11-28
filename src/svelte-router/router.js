import { createHashHistory } from 'history';
import { Store } from 'svelte/store';
import { goBack, goForward } from './methods';

export class HashRouter extends Store {
  constructor(options) {
    super();

    this.history = createHashHistory(options);
    this.connections = [];
    
    const onChange = location => {
      this.set({ location });
      this.connections.forEach(connection => connection.set({ router: this }));
    };

    this.history.listen(onChange);
    onChange(this.history.location);
  }

  get url() {
    return this.history.location.pathname;
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

  formattedUrl(url) {
    const location = { pathname: url };
    return this.history.createHref(location);
  }

  connectTo(stateful, options = {}) {
    const { init = true } = options;

    this.connections.push(stateful);
    if (init) stateful.set({ router: this });
  }
}

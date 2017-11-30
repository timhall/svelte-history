import { createLocation } from 'history';
import match from './match';

export default class History {
  constructor() {
    this.connections = [];
  }

  get location() {
    return this.history.location;
  }

  match(path, options = {}) {
    const { exact = false } = options;
    return match(this.location.pathname, { path, exact });
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

  pathToHref(path) {
    const location =
      typeof path === 'string'
        ? createLocation(path, null, null, this.location)
        : path;

    return this.history.createHref(location);
  }

  connectTo(stateful) {
    this.connections.push(stateful);
    stateful.set({ history: this });
  }

  onChange() {
    this.connections.forEach(connection => {
      connection.set({ history: this });
    });
  }
}

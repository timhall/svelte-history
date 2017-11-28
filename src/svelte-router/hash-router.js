import { createHashHistory } from 'history';
import Router from './router';

export default class HashRouter extends Router {
  constructor(options) {
    super();

    this.history = createHashHistory(options);
    this.history.listen(location => this.onChange(location));
    this.onChange(this.history.location);
  }
}

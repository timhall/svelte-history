import { createBrowserHistory } from 'history';
import History from './history';

export default class BrowserHistory extends History {
  constructor(options) {
    super();

    this.history = createBrowserHistory(options);
    this.history.listen(() => this.onChange());
  }
}

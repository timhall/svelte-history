import { createHashHistory } from 'history';
import History from './history';

export default class HashHistory extends History {
  constructor(options) {
    super();

    this.history = createHashHistory(options);
    this.history.listen(() => this.onChange());
  }
}

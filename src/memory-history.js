import { createMemoryHistory } from 'history';
import History from './history';

export default class MemoryHistory extends History {
  constructor(options) {
    super();

    this.history = createMemoryHistory(options);
    this.history.listen(() => this.onChange());
  }
}

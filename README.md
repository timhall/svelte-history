# svelte-history

## Install

```sh
npm install --save svelte-history
yarn add svelte-history
```

## Usage

```js
import { Store } from 'svelte/store';
import { createBrowserHistory } from 'svelte-history';
// Also available:
// - createHashHistory
// - createMemoryHistory

import App from './App.html';

const store = new Store();

const history = createBrowserHistory();
history.connectTo(store);

const app = new App({
  target: document.getElementById('app'),
  store
});
```

## match

```html
{{#if $history.match('/')}}
  <Home />
{{elseif routes.books}}
  <Books />

  {{#if routes.book}}
    <Book id="{{routes.book.id}}" />
  {{/if}}
{{else}}
  <NotFound />
{{/if}}

<script>
  // import Home, Books, Book, NotFound...

  export default {
    computed: {
      routes: $history => ({
        books: $history.match('/books'),
        book: $history.match({ path: '/book/:id', exact: true })
      })
    }
  }
</script>
```

## methods

```html
<button on:click="goBack()">Back</button>
<button on:click="goForward()">Forward</button>
<button on:click="push('/')">Home</button>
<button on:click="replace('/redirect')">Replace</button>
<button on:click="go(-2)">Back 2x</button>

<script>
  import { push, replace, go, goBack, goForward } from 'svelte-history';

  export default {
    methods: { push, replace, go, goBack, goForward }
  }
</script>
```

## toRoutes

Helper for reducing `match` boilerplate.

```html
{{#if routes.a}}
  A
{{elseif routes.b}}
  B
{{elseif routes.c}}
  C (d: {{routes.c.d}}, e: {{routes.c.e}})
{{else}}
  Not Found
{{/if}}

<script>
  import { toRoutes } from 'svelte-history';

  export default {
    computed: {
      routes: $history => toRoutes($history, {
        a: { path: '/a', exact: true },
        b: '/b',
        c: '/c/:d/:e'
      })
    }
  }
</script>
```

## Link

```html
<Link to="/">Home</Link>
<Link to="/replace" replace>Internal</Link>

<script>
  import Link from 'svelte-history/Link.html';

  export default {
    components: { Link }
  }
</script>
```

## Route

Note: You can think of `<Route>` as the future API, but it has some deficiencies
currently:

* Content is rendered immediately, regardless of whether the route is active
  ([see #903](https://github.com/sveltejs/svelte/issues/903))
* There is no `<Switch>` available to catch unmatched situations (e.g. for 404)
* Route params (see `bind:id` below) are initially unbound, potentially leading
  to issues since content is rendered immediately.

```html
<Route path="/" exact>
  <Home />
</Route>
<Route path="/books">
  <Books />

  <Route path="/books/:id" bind:id>
    <Book :id />
  </Route>
</Route>
<Route path="/authors" exact bind:match>
  <!-- Only render when active -->
  {{#if match}}
    <Authors />
  {{/if}}
</Route>
<Route path="/authors/:name" bind:name>
  <!-- Guard for initially unbound name -->
  {{#if name}}
    <Author :name />
  {{/if}}
</Route>

<script>
  import Route from 'svelte-history/Route.html';
  // import Home, Books, Book, Authors, Author...

  export default {
    components: { Route }
  }
</script>
```

## Redirect

```html
{{#if !authorized}}
  <Redirect to="/" />
{{/if}}

<Redirect from="/old" to="/new" />

<script>
  import Redirect from 'svelte-history/Redirect.html';

  export default {
    components: { Redirect }
  }
</script>
```

## Custom Link

```html
<li class="{{active ? 'is-active' : ''}}">
  <button on:click="click()"><slot /></button>
</li>

<script>
  export default {
    data: () => ({ to: '/', exact: true }),
    computed: {
      active: ($history, to, exact) => $history.match({ path: to, exact }),
    },
    methods: {
      click() {
        const history = this.store.get('history');
        const to = this.get('to');

        history.push(to);
      }
    }
  }
</script>
```

## SSR

Example coming soon

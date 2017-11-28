# svelte-router

Component-based router for svelte.

(Note: name to change, as `svelte-router` is already used)

## Router

```js
import { HashRouter as Router } from 'svelte-router';
import { Store } from 'svelte/store';

const store = new Store();
const router = new Router();
router.connectTo(store);

const app = new App({
  target: document.getElementById('app'),
  store
});
```

```js
// Alternatively, can pass router directly as data on App,
// but need to be sure to pass to all <Route>, <Link>, <Switch>, and <Redirect> components
import { HashRouter as Router } from 'svelte-router';

const router = new Router();
const app = new App({
  target: document.getElementById('app'),
  data: { router }
});

router.connectTo(app, { init: false });
```

TODO

- [ ] BrowserRouter
- [ ] SSR routing

## Route

```html
<Route path="/" exact>
  Home
</Route>
<Route path="/books">
  Books

  <Route path="/books/:id" bind:id>
    Book {{id}}
  </Route>
</Route>

<script>
  import { Route } from 'svelte-router'

  export default {
    components: { Route }
  }
</script>
```

`<Route>` is the fundamental component of svelte-router. As a standalone components, it can be used throughout a svelte app to show content as needed, based on the current url. url parameters are set directly on the `<Route>` component and can be retrieved via data-binding. This sets the data value in the current component scope, so the binding may need to be renamed to avoid conflicts.

```html
<Route path="/static/:dynamic" bind:dynamic>
  {{dynamic}}
</Route>

<!-- Rename binding to avoid conflicting with existing "a" -->
<Route path="/:a" bind:a="paramA">
  {{paramA}}
</Route>

<script>
  import { Route } from 'svelte-router'

  export default {
    components: { Route },
    data: () => ({a: 'may-conflict' })
  }
</script>
```

Additionally, svelte renders slot content when the component is rendered [see #903](https://github.com/sveltejs/svelte/issues/903), so content inside of the route is rendered initially even if the `<Route>` is not active and then shown when the route becomes active. This can lead to issues with unbound parameters or content that shouldn't be rendered until a route is active. Here are some techniques to avoid these issues:

```html
<Route path="/" bind:active>
  {{#if active}}
    <WaitForActive />
  {{/if}}
</Route>  

<Route path="/static/:dynamic" bind:dynamic>
  {{#if dynamic}}
    <WaitForParam :dynamic />
  {{/if}}
</Route>

<script>
  import { Route } from 'svelte-router'
  import WaitForActive from '...'
  import WaitForParam from '...'

  export default {
    components: { Route, WaitForActive, WaitForParam }
  }
</script>
```

## Link

```html
<nav>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/replaced" replace>Replace</Link></li>
</nav>


<script>
  import { Link } from 'svelte-router'

  export default {
    components: { Link }
  }
</script>
```

Renders an `<a>` with the proper `href` and handling for `ctrl-click`, `replace`, and other behaviors.

TODO

- [ ] Standard approach for custom links (e.g. Buttons)
- [ ] Highlight active links

## Redirect

Redirects are used to define static or dynamic redirects to other routes.

```html
<!-- Static redirect -->
<Redirect from="/old" to="/new" exact />

<!-- Dynamic redirect -->
<Route path="/" exact>
  {{#if !authorized}}
    <Redirect to="/login" />
  {{/if}}
</Route>

<!-- Static with params -->
<Route path="/old/:id" bind:id>
  <!-- Guard for unbound case on inactive render -->
  {{#if id}}
    <Redirect to="/new/{{id}}" />
  {{/if}}
</Route>

<script>
  import { Redirect, Route } from 'svelte-router';

  export default {
    components: { Redirect, Route },
    data: () => ({ authorized: false })
  }
</script>
```

## Switch

(Note: not implemented just yet) To match a single route exclusively, you can wrap routes in a `<Switch>`. This is useful for handling unmatched routes and mixing static and dynamic components. `<Switch>` creates a router context that is then passed to all contained `<Route>`, `<Link>`, and `<Redirect>` components.

```html
<Switch bind:context=router>
  <Route :router path="/authors" exact>
    Authors
  </Route>
  <Route :router path="/authors/static">
    Static Author
  </Route>
  <Route :router path="/authors/:name" bind:name>
    Author: {{name}}
  </Route>

  <Redirect :router from="/writers" to="/authors" />

  <!--
    Catch-all route if nothing has matched  
  -->
  <Route>
    404 Not Found
  </Route>
</Switch>
```

TODO

- [ ] Implement `<Switch>`

## Development

```
yarn
yarn run dev
```

(May need to run `yarn start` and `yarn run build --watch` in separate processes)

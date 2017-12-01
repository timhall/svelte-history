const { join } = require('path');
const express = require('express');
const { createMemoryHistory } = require('../');

// Currently, store is exported as ES Module
const esm = require('@std/esm')(module, { esm: 'js' });
const { Store } = esm('svelte/store');

// Compile component
require('svelte/ssr/register')({ store: true });
const app = require('./src/App.html');

const server = express();
const store = new Store();
const history = createMemoryHistory();

server.use('/public', express.static(join(__dirname, 'public')));
server.get('/*', (req, res) => {
  history.replace(req.url);
  store.set({ history });

  const data = {};
  const html = app.render(data, { store });

  res.write(`
<!doctype html>
<html>
<head>
  <meta charset='utf8'>
  <meta name='viewport' content='width=device-width'>

  <title>svelte-history</title>

  <link rel='stylesheet' href='/public/global.css'>
  <link rel='stylesheet' href='/public/bundle.css'>
</head>

<body>
  <div id="app">${html}</div>
  <script src='/public/bundle.js'></script>
</body>
</html>
  `);

  res.end();
});

server.listen(5000, () => console.log('Listening at localhost:5000'));

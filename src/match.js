import pathToRegexp from 'path-to-regexp';

const cache = {};

function compile(pattern, options = {}) {
  const id = `${pattern}${options.sensitive}${options.strict}${options.end}`;
  if (cache[id]) return cache[id];

  const keys = [];
  const regex = pathToRegexp(pattern, keys, options);

  // Extract params from match values based on keys + position
  // keys: [{ name, ... }]
  const toParams = values => {
    return keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {});
  };

  const compiled = (cache[id] = { regex, toParams });
  return compiled;
}

export default function match(pathname, options = {}) {
  if (typeof options === 'string') options = { path: options };

  const {
    path = '/',
    exact = false,
    strict = false,
    sensitive = false
  } = options;
  const { regex, toParams } = compile(path, { end: exact, strict, sensitive });

  const match = regex.exec(pathname);
  if (!match) return false;

  const [url, ...values] = match;
  if (exact && pathname !== url) return false;

  const params = toParams(values);
  return params;
}

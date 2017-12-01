import pathToRegexp from 'path-to-regexp';

const cache = {};

function compile(pattern, options = {}) {
  const id = `${pattern}${options.sensitive}${options.strict}${options.end}`;
  if (cache[id]) return cache[id];

  const keys = [];
  const regex = pathToRegexp(pattern, keys, options);
  const compiled = (cache[id] = { regex, keys });

  return compiled;
}

function toParams(keys, values) {
  return keys.reduce((memo, key, index) => {
    memo[key.name] = values[index];
    return memo;
  }, {});
}

export default function match(pathname, options = {}) {
  if (typeof options === 'string') options = { path: options };

  const {
    path = '/',
    exact = false,
    strict = false,
    sensitive = false
  } = options;
  const { regex, keys } = compile(path, { end: exact, strict, sensitive });

  const match = regex.exec(pathname);
  if (!match) return false;

  const [url, ...values] = match;
  if (exact && pathname !== url) return false;

  const params = toParams(keys, values);
  return params;
}

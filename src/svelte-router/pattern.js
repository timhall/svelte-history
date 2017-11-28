import UrlPattern from 'url-pattern';

export default class Pattern extends UrlPattern {
  constructor(path, exact = false) {
    const normalized = normalize(path, exact);
    super(normalized);

    this.path = path;
    this.exact = exact;
    this.normalized = normalized;
  }

  params(path) {
    return this.match(path);
  }
}

const leadingSlash = /^\//;
const trailingSplat = /(\*|\*\))$/;
const trailingSlash = /(\/|\/\))$/

export function normalize(path, exact) {
  if (!leadingSlash.test(path)) path = '/' + path;

  if (exact) return path;
  if (trailingSplat.test(path)) return path;
  
  if (!trailingSlash.test(path)) path += '(/*)';
  else path += '(*)';

  return path;
}

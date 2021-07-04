const re1 = /([a-z\d])([A-Z])/g;
const re2 = /([A-Z]+)([A-Z][a-z\d]+)/g;

export function decamelize(str: string, joiner = '-', toLower = true){
	const s = str.replace(re1, `$1${joiner}$2`).replace(re2, `$1${joiner}$2`);
  return toLower ? s.toLowerCase() : s;
}

export function capitalize(str: string) {
  if (!str) return str;
  return str.replace(/^[a-z]|( [a-z])/g, (m: string) => m.toUpperCase());
}

export function join(str: string, prefix: string, splitter: string = ' ', suffix: string = '', joiner: string = splitter) {
  if (!str) return str;
  if (!str.includes(splitter)) {
    return `${prefix}${str}${suffix}`;
  }
  return str.split(splitter).map(part => `${prefix}${part}${suffix}`).join(joiner);
}

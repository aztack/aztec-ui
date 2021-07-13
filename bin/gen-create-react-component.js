const $path = require('path');
const { walk, capitalize, camelize } = require('./utils');

const skip = ['builtin'];
const inconsistency = {icons: 'icon'};
const templates = {
  normal(azName, name) {
    return `export const ${azName} = createReactComponent<Partial<Components.${azName}>, HTML${azName}Element>('az-${name}');`
  },
  override(azName, name, field, to) {
    return `export const ${azName} = createReactComponent<Partial<Omit<Components.${azName}, '${field}'> & {${field}: ${to}}>, HTML${azName}Element>('az-${name}');`
  }
};

const overrides = {
  tabs: ['items', 'string']
}
console.log(`// Auto Generated
import 'aztec-ui';
import { Components } from 'aztec-ui';
import { createReactComponent } from './createComponent';
`);
walk($path.resolve(__dirname, '../src/components'), (name, isDir) => {
  if (!isDir || skip.includes(name)) return;
  name = inconsistency[name] || name;
  const tpl = overrides[name] ? templates.override : templates.normal;
  const azName = `Az${capitalize(camelize(name))}`;
  console.log(tpl(azName, name, ...(overrides[name] || [])));
});

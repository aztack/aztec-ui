const $path = require('path');
const $fs = require('fs');
const ts = require('typescript');
const { walk, capitalize, camelize } = require('./utils');

const propsOfComp = {};

const skip = ['builtin'];
const inconsistency = {icons: 'icon'};
const templates = {
  normal(azName, name) {
    const props = propsOfComp[azName] || [];
    return props.length
      ? `export const ${azName} = defineContainer<JSX.${azName}>('az-${name}', ${formatProps(props)});`
      : `export const ${azName} = defineContainer<JSX.${azName}>('az-${name}');`
  }
};

const node = ts.createSourceFile(
  'components.d.ts',
  $fs.readFileSync($path.resolve(__dirname, '..', 'dist', 'types', 'components.d.ts'), 'utf8'),
  ts.ScriptTarget.Latest
);

node.forEachChild(child => {
  if (ts.SyntaxKind[child.kind] === 'ModuleDeclaration' && child.name.text === 'Components') {
    child.body.statements.forEach(stat => {
      propsOfComp[stat.name.text] = stat.members.map(m => m.name.text);
    });
  }
});

console.log(`// Auto Generated
import { JSX } from 'aztec-ui'
import { defineContainer } from './defineContainer';
`);
walk($path.resolve(__dirname, '../src/components'), (name, isDir) => {
  if (!isDir || skip.includes(name)) return;
  name = inconsistency[name] || name;
  const tpl = templates.normal;
  const azName = `Az${capitalize(camelize(name))}`;
  console.log(tpl(azName, name));
});

function formatProps(props) {
  return JSON.stringify(props)
    .replace(/","/g, '",\n\t"')
    .replace('["', '[\n\t"')
    .replace('"]', '"\n]');
}

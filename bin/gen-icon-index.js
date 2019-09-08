const $fs = require('fs');
const $path = require('path');

// helpers
const capitalize = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
const camelize = (str) => str.split('-').map(capitalize).join('');
const _ = console.log;

const __ = iconFiles = [];
walk($path.resolve(__dirname, '../src/components/icons/builtin'), (filename) => {
  if (filename === 'index.tsx') return;
  iconFiles.push(filename.replace('.tsx', ''));
});
iconFiles.sort();
__._ = __.forEach

// output
_(`//Auto Generated by 'npm run gen-icon-index'`);
__._(name => {
  _(`import ${camelize(name)} from './${name}';`)
});
_(`const builtinIcons: Record<string, string> = {`)
__._(name => {
_(`  "${name}": ${camelize(name)},`);
});
_(`};
export default builtinIcons;
// for Demo
/*`);
__._(name => {
_(`  <az-icon icon="${name}"></az-icon>`)
});
_('*/');

// walk dir recursively
function walk(dir, cb) {
  const files = $fs.readdirSync(dir);
  files.forEach(file => {
    const path = $path.join(dir, file);
    if ($fs.statSync(path).isDirectory()) {
      walk(path, cb);
    } else {
      cb(file);
    }
  });
};
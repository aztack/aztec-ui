const $fs = require('fs');
const $path = require('path');

// walk dir recursively
function walk(dir, cb) {
  const files = $fs.readdirSync(dir);
  files.forEach(file => {
    const path = $path.join(dir, file);
    if ($fs.statSync(path).isDirectory()) {
      cb(file, true);
      walk(path, cb);
    } else {
      cb(file);
    }
  });
};

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.substr(1)}`
}

function camelize(str) {
  return str.split('-').map(capitalize).join('')
}

module.exports = {
  walk,
  capitalize,
  camelize
};

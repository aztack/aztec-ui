const $fs = require('fs');
const $path = require('path');
const $readline = require('readline');

const rl = $readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input full svg of the icon:', (svg) => {
  rl.question(`Icon name without extension?`, name => {
    if (!name) {
      console.error(`Name is empty`);
      rl.close()
    }
    try {
      if (!svg.match(/^\s*<svg|<\/svg>$/)) {
        throw new Error(`Invalid SVG`)
      }
      const m = svg.match(/(?:<path d=")(.*?)"/);
      if (!m) {
        throw new Error(`No path found in svg`);
      }
      const code = `export default "${m[0].replace('<path d="', '')};`;
      const iconFilePath = $path.resolve(__dirname, '../src/components/icons/builtin', name) + '.tsx';
      $fs.writeFileSync(iconFilePath, code);
      console.log(`Write to file ${iconFilePath}!`);
    } catch (e) {
      console.error(e.message);
    } finally {
      rl.close();
    }
  });
});

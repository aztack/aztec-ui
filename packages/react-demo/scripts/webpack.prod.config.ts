import $path from 'path';
import {webpackConfig} from './utils';

const partsDir = $path.resolve(__dirname, 'parts');

const config = webpackConfig(partsDir, {NODE_ENV: 'production'})
  .target('web')
  .entry('index').add('./src/index.ts').end()
  .entry('index.css').add('./src/global.scss').end()
  .output.filename('[name].min.js').end();

export default config.toConfig();

if (process.argv[1].includes(__dirname)) {
  console.log(config.toString());
}

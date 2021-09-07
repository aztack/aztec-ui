import $path from 'path';
import {webpackConfig} from './utils';

const partsDir = $path.resolve(__dirname, 'parts');

const config = webpackConfig(partsDir, {NODE_ENV: 'development'})
  .target('web')
  .entry('index.css').add('./src/global.scss').end()
  .entry('demo').add('./src/demo.tsx').end()
  .output.filename('[name].js').end();

export default config.toConfig();

if (process.argv[1].includes(__dirname)) {
  console.log(config.toString());
}

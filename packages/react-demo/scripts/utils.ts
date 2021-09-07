import $fs from 'fs';
import $path from 'path';
import WebpackChain from 'webpack-chain';

const root = $path.resolve(__dirname, '..');

export interface ConfigOptions {
  root: string;
  dist: string;
  src: string;
  NODE_ENV: string;
  plugins: Record<string, object>;
}

export function webpackConfig(partsDir: string, opts?: Partial<ConfigOptions>) {
  const options = Object.assign({
    root,
    dist: $path.resolve(root, 'dist'),
    src: $path.resolve(root, 'src')
  }, opts);

  const config = new WebpackChain();

  $fs.readdirSync(partsDir).forEach(part => {
    const configPart = require($path.resolve(__dirname, `./parts/${part}`));
    configPart(config, options)
    console.log(`Using ${part}`);
  });

  return config;
}

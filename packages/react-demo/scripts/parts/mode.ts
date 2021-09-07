import WebpackChain from 'webpack-chain';
import { ConfigOptions } from '../utils';

module.exports = function (config: WebpackChain, options: ConfigOptions) {
  const env = options.NODE_ENV || process.env.NODE_ENV || 'production';
  const isDev = env.toLowerCase().includes('dev');
  const mode = isDev ? 'development' : 'production';
  config.mode(mode);
  config.devtool(isDev ? 'inline-source-map' : false)
};

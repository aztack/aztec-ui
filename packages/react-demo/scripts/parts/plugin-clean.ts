import WebpackChain from 'webpack-chain';
import { CleanWebpackPlugin, Options } from 'clean-webpack-plugin';
import { ConfigOptions } from '../utils';

module.exports = function (config: WebpackChain, options: ConfigOptions) {
  const opts = options?.plugins?.clean;
  const args: [Options?] = opts ? [opts] : [];
  config.plugin('clean').use(CleanWebpackPlugin, args);
};

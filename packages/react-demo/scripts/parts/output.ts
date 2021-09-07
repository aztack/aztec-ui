import WebpackChain from 'webpack-chain';
import { ConfigOptions } from '../utils';

module.exports = function (config: WebpackChain, options: ConfigOptions) {
  config.output.path(options.dist)
    .filename('[name].js');
};

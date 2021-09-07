import { ConfigOptions } from '../utils';
import WebpackChain from 'webpack-chain';
import webpack from 'webpack';

module.exports = function (config: WebpackChain, options: ConfigOptions) {
  const plugin = config.plugin('define');
  const env = options.NODE_ENV || process.env.NODE_ENV || 'production';
  plugin.use(webpack.DefinePlugin, [{
      'process.env.NODE_ENV': JSON.stringify(env)
    }]);
  return plugin;
};

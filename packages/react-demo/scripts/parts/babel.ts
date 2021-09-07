import WebpackChain from 'webpack-chain';

module.exports = function (config: WebpackChain) {
  const rule = config.module.rule('javascript')
  rule.test(/\.jsx?$/)
    .use('babel-loader')
      .loader('babel-loader')
  config.resolve.extensions.add('.js').add('.jsx');
  return rule;
}

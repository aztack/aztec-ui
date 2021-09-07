import WebpackChain from 'webpack-chain';

module.exports = function (config: WebpackChain) {
  const rule = config.module.rule('typescript')
  rule.test(/\.tsx?$/)
    .use('ts-loader')
      .loader('ts-loader')
        .options({
          configFile: 'tsconfig.json'
        });
  config.resolve.extensions.add('.ts').add('.tsx');
  return rule;
}

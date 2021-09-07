module.exports = {
  chainWebpack: function (config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(function(config) {
        if (!config.compilerOptions) config.compilerOptions = {};
        config.compilerOptions.whitespace = 'preserve'
        return config;
      });
  }
};

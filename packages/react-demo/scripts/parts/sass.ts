import $path from 'path';
import WebpackChain from 'webpack-chain';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import MiniCssExtract from 'mini-css-extract-plugin';
import CleanAfterEmit from 'clean-after-emit-webpack-plugin';
import { ConfigOptions } from '../utils';


module.exports = function (config: WebpackChain, options: ConfigOptions) {
  config.module.rule('sass-loader')
    .test(/\.(scss|sass)$/)
      .use('file-loader')
        .loader('file-loader')
          .options({
            name: '[name].css'
          })
        .end()
      .use('extract-loader')
        .loader('extract-loader')
        .end()
      .use('css-loader')
        .loader('css-loader')
        .end()
      // .use('postcss-loader')
      //   .loader('postcss-loader')
      //     .options({
      //       postcssOptions: {
      //         plugins: [autoprefixer(), cssnano()]
      //       }
      //     })
      //   .end()
      .use('sass-loader')
        .loader('sass-loader')
        .end();

  /* Mini CSS extract */
  config.module.rule('css')
    .test(/\.css$/)
      .use('mini-css-extract-plugin-loader')
        .loader(MiniCssExtract.loader)
          // .options({
          //   filename: '[name].css'
          // })
        .loader('css-loader')
        .end();

  config.plugin('mini-css-extract').use(MiniCssExtract)

  config.plugin('clean-after-emit').use(CleanAfterEmit, [{
    paths: [$path.join(options.dist, '*.css.js')]
  }])
}

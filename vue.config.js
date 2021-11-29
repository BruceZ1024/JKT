const path = require('path');
const { merge } = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/css/sass/variable.scss'),
        path.resolve(__dirname, 'src/assets/css/sass/mixin.scss'),
        path.resolve(__dirname, 'src/assets/css/sass/coverage.scss'),
        path.resolve(__dirname, 'src/assets/css/sass/common.scss'),
      ],
    });
}

module.exports = {
  lintOnSave: false,

  publicPath: './',

  devServer: {
    proxy: {
      '/api': {
          //target: 'https://www.biconomy.com/api/v2',
          target: 'http://8.142.121.31/api',
          changeOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
      }
    }
  },

  configureWebpack: {
    name: 'jkt',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));

    config.plugin('html').tap((args) => {
      args[0].title = 'JokerManor';
      return args;
    });

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        return merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        });
      });

    // svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });
    const fileRule = config.module.rule('file');
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader');
  },
};

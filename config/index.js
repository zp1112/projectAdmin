// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const buildEnv = require('./prod.env');
const devEnv = require('./dev.env');

module.exports = {
  build: {
    env: buildEnv,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    serviceHost: 'http://180.96.11.73:7373'
  },
  dev: {
    env: devEnv,
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    // serviceHost:'http://192.168.0.23:7070'
    serviceHost: 'http://180.96.11.73:7373',
    mongod: {
      cookieSecret: 'myblog',
      db: 'blog',
      host: 'localhost',
      port: 27017
    }
  }
};

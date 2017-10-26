/**
 * Created by Administrator on 2016/12/16.
 */
const webpack = require('webpack');

module.exports = {
  entry: {
    lib: ['vue', 'vue-router', 'axios', 'vuex', 'element-ui', 'echarts']
  },
  output: {
    path: '../static/js/',
    filename: '[name].[chunkhash:7].js',
    library: '[name]_[chunkhash:7]'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: './manifest.json',
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_[chunkhash:7]'
    })
  ]
};

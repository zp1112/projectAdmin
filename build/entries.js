/**
 * Created by wuhao on 2016/12/21.
 */
var getEntry = require('./getPaths');
var entries = getEntry('./src/module/**/index.js');
entries.vendor = ['vue', 'vue-router', 'axios', 'vuex', 'element-ui'];
module.exports = entries;

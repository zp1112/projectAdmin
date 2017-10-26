/**
 * Created by wuhao on 2016/12/6.
 */
import 'babel-polyfill';
import Vue from 'vue';
import 'element-ui/packages/theme-default/lib/index.css';
import Element from 'element-ui';
// import '../less/normalize.css';
import '../less/common.less';
import '../less/awesome/font-awesome.less';
import App from '../components/app.vue';
import router from './router';
import ApiPlugin from '../js/api_plugin';
import store from './store';
import Time from '../components/directives/time';
import Placeholder from '../components/directives/placeholder';
// import 'bootstrap/dist/css/bootstrap.css';
window.console = window.console || (function () {
    const c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
      = c.clear = c.exception = c.trace = c.assert = function () {};
    return c;
  }());
Vue.use(ApiPlugin);
Vue.use(Element);
Vue.directive('time', Time);
Vue.directive('placeholder', Placeholder);
export default new Vue({
  router,
  store,
  el: '#app',
  template: '<App />',
  components: { App }
});

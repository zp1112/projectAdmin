/**
 * Created by wuhao on 2017/2/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  sentence: '',
  candyLogin: false,
  outProjects: [],
  inProjects: []
};
if (localStorage.candyLogin) {
  state.candyLogin = true;
}
const store = new Vuex.Store({
  state
});

export default store;

/**
 * Created by wuhao on 2017/2/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  sentence: '',
  outProjects: [],
  inProjects: []
};
const store = new Vuex.Store({
  state
});

export default store;

/*
 * @Author: candy
 * @Date: 2017-10-27 17:08:09
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-27 17:10:03
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  currentUserInfo: null
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});

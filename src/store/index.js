/*
 * @Author: candy
 * @Date: 2017-10-27 17:08:09
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-30 08:55:51
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  currentUserInfo: null,
  errMsg: ''
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});

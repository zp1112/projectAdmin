/*
 * @Author: candy
 * @Date: 2017-10-27 17:08:09
 * @Last Modified by: candy
 * @Last Modified time: 2017-11-03 17:21:30
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  currentUserInfo: null,
  msg: '',
  errMsg: '',
  menus: {
    '/project': true,
    '/role': false,
    '/report': true,
    '/users/add': false,
    '/team/add': false
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});

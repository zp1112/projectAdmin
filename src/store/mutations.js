/*
 * @Author: candy
 * @Date: 2017-10-27 17:07:31
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-27 17:09:51
 */

import * as types from './mutations-types';

export default {
  [types.GET_USER_INFO](state, userInfo) {
    state.currentUserInfo = userInfo;
  }
};

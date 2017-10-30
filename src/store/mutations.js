/*
 * @Author: candy
 * @Date: 2017-10-27 17:07:31
 * @Last Modified by: candy
 * @Last Modified time: 2017-10-30 09:09:58
 */

import * as types from './mutations-types';

export default {
  [types.GET_USER_INFO](state, userInfo) {
    state.currentUserInfo = userInfo;
  },
  [types.API_ERROR](state, errMsg) {
    state.errMsg = errMsg;
  }
};

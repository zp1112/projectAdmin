/**
 * Created by wuhao on 2016/11/22.
 */
import DateUtil from 'element-ui/src/utils/date';

const createContent = function (el, binding, vnode) {
  const value = binding.value;
  if (!value) {
    console.error('v-time: 日期不能为空');
  } else {
    let format = 'yyyy-MM-dd HH:mm:ss';
    if (vnode.data.attrs && vnode.data.attrs.format) {
      format = vnode.data.attrs.format;
    }
    el.innerHTML = DateUtil.format(value, format);
  }
};
export default {
  bind(el, binding, vnode) {
    createContent(el, binding, vnode);
  },
  update(el, binding, vnode) {
    createContent(el, binding, vnode);
  }
};


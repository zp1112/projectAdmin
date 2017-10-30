exports.checkLogin = function (req, res, next) {
  if (!req.session.user) {
    res.send({
      status: -1,
      msg: '未登录！'
    });
  } else {
    next();
  }
};
exports.checkNotLogin = function (req, res, next) {
  if (req.session.user) {
    res.send({
      status: 0,
      msg: '已登录！'
    });
  }
  next();
};

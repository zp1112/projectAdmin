const user = require('./user');
const admin = require('./admin');
const project = require('./project');

module.exports = function (app) {
  user(app);
  admin(app);
  project(app);
};

const index = require('./index');
const user = require('./user');
const admin = require('./admin');
const project = require('./project');

module.exports = function (app) {
  index(app);
  user(app);
  admin(app);
  project(app);
};

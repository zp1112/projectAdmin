const uuid = require('uuid');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

const teamSchema = new mongoose.Schema({
  name: String,
  uuid: String
}, {
  collection: 'Team'
});

const TeamModel = mongoose.model('Team', teamSchema);

function Team(user) {
  this.name = user.name;
  this.uuid = uuid.v1();
}

module.exports = Team;

// 存储用户信息
Team.prototype.save = function (callback) {
  // 要存入数据库的用户信息文档
  const user = {
    name: this.name,
    uuid: this.uuid
  };

  const newUser = new TeamModel(user);

  newUser.save((err, user) => {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

// 读取用户信息
Team.get = function (id, callback) {
  TeamModel.findOne({ uuid: id }, (err, user) => {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};
Team.getAll = function (callback) {
  TeamModel.find((err, user) => {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};
Team.deleteOne = function (id, callback) {
  TeamModel.remove({ uuid: id }, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

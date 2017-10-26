// var mongodb = require('./db');
const crypto = require('crypto');
const mongoose = require('mongoose');

const ObjectID = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/blog');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdTime: Number,
  updatedTime: Number,
  status: Boolean,
  members: Array,
  teams: Array,
  owner: String
}, {
  collection: 'project'
});

const ProjectModel = mongoose.model('Project', projectSchema);

function Project(project) {
  this.name = project.name;
  this.description = project.description;
  this.createdTime = Date.now();
  this.updatedTime = Date.now();
  this.status = true;
  this.members = project.members || [];
  this.teams = project.teams;
  this.owner = project.owner;
}

module.exports = Project;

// 存储用户信息
Project.prototype.save = function () {
  // 要存入数据库的用户信息文档
  const project = {
    name: this.name,
    description: this.description,
    createdTime: Date.now(),
    updatedTime: Date.now(),
    status: this.status,
    members: this.members,
    teams: this.teams,
    owner: this.owner
  };

  const newProject = new ProjectModel(project);
  return new Promise((res, rej) => {
    newProject.save((err, pro) => {
      if (err) {
        rej(err);
      } else {
        res(pro);
      }
    });
  });
};

Project.get = function (name) {
  return new Promise((res, rej) => {
    ProjectModel.findOne({ name }, (err, project) => {
      if (err) {
        rej(err);
      } else {
        res(project);
      }
    });
  });
};
Project.getAll = function () {
  return new Promise((res, rej) => {
    ProjectModel.find((err, project) => {
      if (err) {
        rej(err);
      } else {
        res(project);
      }
    });
  });
};

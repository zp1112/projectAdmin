/**
 * Created by Candy on 2017/8/14.
 */
import Team from '../models/team';
import User from '../models/user';

module.exports = function (app) {
  app.post('/team/add', (req, res) => {
    const { name } = req.body;
    const newTeam = new Team({
      name
    });
    // 检查用户名是否已经存在
    Team.get(newTeam.name, (err, user) => {
      if (err) {
        res.send({
          status: 0,
          msg: `注册错误！${err}`
        });
      } else if (user) {
        res.send({
          status: 0,
          msg: '用户已存在'
        });
      } else {
        newTeam.save((err) => {
          if (err) {
            res.send({
              status: 0,
              msg: `注册错误！${err}`
            });
          }
          res.send({
            status: 1,
            msg: '注册成功'
          });
        });
      }
    });
  });
  // app.get('/team', async (req, res) => {
  //   Team.getAll((err, team) => {
  //     res.send({
  //       status: 1,
  //       team
  //     });
  //   });
  // });
  app.post('/team/delete', async (req, res) => {
    const uuid = req.body.uuid;
    Team.deleteOne(uuid, (err) => {
      res.send({
        status: 1,
        msg: '删除成功!'
      });
    });
  });
  app.get('/users', async (req, res) => {
    User.getAll((err, user) => {
      res.send({
        status: 1,
        user
      });
    });
  });
};

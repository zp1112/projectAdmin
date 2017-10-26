/**
 * Created by Candy on 2017/8/14.
 */
import qiniu from 'node-qiniu';
import fs from 'fs';
const crypto = require('crypto');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

const checkNotLogin = require('./common').checkNotLogin;
const checkLogin = require('./common').checkLogin;

qiniu.config({
  access_key: 'hl-JYjlyYNZjI1OdsFXgJsRwUsWPEYG_KKkObaCg',
  secret_key: 'xRS3jCq-ghciRYzWKc11QvYEguIZxLxSdN5wvTIE'
});
const imagesBucket = qiniu.bucket('blog');
/* GET home page. */
module.exports = function (app) {
  app.get('/posts', async (req, res) => {
    // 判断是否是第一页，并把请求的页数转换成 number 类型
    const page = parseInt(req.query.p, 10) || 1;
    // 查询并返回第 page 页的 10 篇文章
    const result = await Post.getTen(page);
    res.send({
      posts: result.docs,
      page,
      isFirstPage: (page - 1) === 0,
      isLastPage: ((page - 1) * 10 + result.docs.length) === result.total
    });
  });
  app.post('/post', checkLogin);
  app.post('/post', async (req, res) => {
    const currentUser = {
      name: 'candyzheng'
    };
    const tags = [req.body.tag1, req.body.tag2, req.body.tag3];
    const post = new Post(currentUser.name, currentUser.thumbnail, req.body.title, tags, req.body.post);
    const result = await post.save(post);
    if (result.status) {
      res.send({
        status: 1,
        msg: '发布成功！'
      });
    }
    res.send({
      result
    });
  });
  app.use(multipart({ uploadDir: './temp' }));
  app.post('/upload', multipartMiddleware, (req, res) => {
    if (!req.session.user) {
      res.send({
        status: 0,
        msg: '未登录！'
      });
    } else {
      imagesBucket.putFile(req.files.file.originalFilename, `./${req.files.file.path}`, function(err, reply) {
        if (err) {
          res.send({
            status: 0,
            msg: err
          });
        } else {
          res.send({
            status: 1,
            msg: reply
          });
        }
      });
    }
    fs.unlink(`./${req.files.file.path}`);
  });
  app.post('/upload/thumbnail', multipartMiddleware, (req, res) => {
    if (!req.session.user) {
      res.send({
        status: 0,
        msg: '未登录！'
      });
    } else {
      imagesBucket.putFile(req.files.file.originalFilename, `./${req.files.file.path}`, function(err, reply) {
        if (err) {
          res.send({
            status: 0,
            msg: err
          });
        } else {
          res.send({
            status: 1,
            msg: reply
          });
        }
      });
    }
    fs.unlink(`./${req.files.file.path}`);
  });
  app.get('/archive/:name', (req, res) => {
    Post.getArchive(req.params.name, (err, posts) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('archive', {
        title: '存档',
        posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
  app.get('/tags', (req, res) => {
    Post.getTags((err, posts) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('tags', {
        title: '标签',
        posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
  app.get('/tags/:tag', (req, res) => {
    Post.getTag(req.params.tag, (err, posts) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('tag', {
        title: `标签:${req.params.tag}`,
        posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
  app.get('/links', (req, res) => {
    res.render('links', {
      title: '友情链接',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.get('/search', (req, res) => {
    Post.search(req.query.keyword, (err, posts) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('search', {
        title: `搜索:${req.query.keyword}`,
        posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
  app.get('/u/:name', (req, res) => {
    const page = parseInt(req.query.p) || 1;
    // 检查用户是否存在
    User.get(req.params.name, (err, user) => {
      if (!user) {
        req.flash('error', '用户不存在!');
        return res.redirect('/');
      }
      // 查询并返回该用户第 page 页的 10 篇文章
      Post.getTen(user.name, page, (err, posts, total) => {
        if (err) {
          req.flash('error', err);
          return res.redirect('/');
        }
        res.render('user', {
          title: user.name,
          posts,
          page,
          isFirstPage: (page - 1) == 0,
          isLastPage: ((page - 1) * 10 + posts.length) == total,
          user: req.session.user,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
    });
  });
  app.get('/p', async (req, res) => {
    const result = await Post.getOne(req.query.id);
    if (result.status) res.send(result);
    res.send({
      status: 0,
      msg: result.msg
    });
  });
  app.get('/pt', async (req, res) => {
    const result = await Post.getTwo(req.query.id);
    if (result.status) res.send(result);
    res.send({
      status: 0,
      msg: result.msg
    });
  });
  app.get('/edit', async (req, res) => {
    const post = await Post.edit(req.query.id);
    if (post.status) {
      res.send(post);
    }
    res.send({
      status: 0,
      msg: post.msg
    });
  });
  app.post('/edit', checkLogin);
  app.post('/edit', async (req, res) => {
    const result = await Post.update(req.body.id, req.body.post, req.body.thumbnail, req.body.tags, req.body.title, +new Date());
    if (result.status) res.send(result);
    res.send({
      status: 0,
      msg: result.msg
    });
  });
  app.post('/remove', checkLogin);
  app.post('/remove', async (req, res) => {
    const result = await Post.remove(req.body.id);
    if (!result.status) {
      res.send({
        status: 0,
        msg: `删除失败!${result.msg}`
      });
    } else {
      res.send({
        status: 1,
        msg: '删除成功!'
      });
    }
  });
  app.get('/reprint/:id', checkLogin);
  app.get('/reprint/:id', (req, res) => {
    Post.edit(req.params.id, (err, post) => {
      if (err) {
        req.flash('error', err);
        return res.redirect(back);
      }
      let currentUser = req.session.user,
        reprint_from = { _id: post._id },
        reprint_to = { name: currentUser.name, head: currentUser.head };
      Post.reprint(reprint_from, reprint_to, (err, post) => {
        if (err) {
          req.flash('error', err);
          return res.redirect('back');
        }
        req.flash('success', '转载成功!');
        const url = encodeURI(`/p/${post._id}`);
        // 跳转到转载后的文章页面
        res.redirect(url);
      });
    });
  });
};

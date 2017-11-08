require('./check-versions')();
const axios = require('axios');
const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
app.use(bodyParser.json());

const compiler = webpack(webpackConfig);

app.get('/test.json', (req, res) => {
  axios.get('http://v3.yu-qing.com/static/test.json').then(({ data }) => {
    res.json(data);
  });
});
app.post('/case/case_complex/create', (req, res) => {
  axios({ url: 'http://180.96.11.73:7070/case/case_complex/create', method: 'post', data: req.body })
    .then((response) => {
      res.send(response.data);
    });
});

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: true
  }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use('/', express.static('./static'));
// app.use(staticPath, express.static('./static'));

app.post('/sss', (req, res) => {
  res.send({ status: 1 });
});

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  const uri = `http://localhost:${port}`;
  console.log(`Listening at ${uri}\n`);

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});

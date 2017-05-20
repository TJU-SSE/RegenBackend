const router = require('koa-router')();

const TestRepository = require('../orm/repository/testRepository');
const uploadFile = require('../utils/qiniu');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

router.post('/save', async (ctx, next) => {
  var file =ctx.request.body.files.test;
  uploadFile(file.name, file.path);
});

module.exports = router

const router = require('koa-router')();

const TestRepository = require('../orm/repository/testRepository');
const Qiniu = require('../utils/qiniu');

router.get('/admin/index', async (ctx, next) => {
  let imgs = await TestRepository.findAll();
  await ctx.render('index', {
    title: 'Regeneration',
    imgs: imgs
  })
});

router.get('/test', async (ctx, next) => {
  await ctx.cookies.set('sessionId', 'abc');
  await ctx.render('index', {
    title: 'Regeneration',
    imgs: {}
  });
});

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {});
});

router.get('/logout', async (ctx, next) => {
  await ctx.cookies.set('sessionId', '');
  await ctx.render('logout');
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
  ctx.redirect('/admin/index');
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

router.post('/save', async (ctx, next) => {
  var file = ctx.request.body.files.test;
  await new Promise((resolve, reject) => {
    Qiniu.uploadFile(file.name, file.path, function () {
      resolve();
    });
  });
  ctx.redirect('index');
});

router.post('/delete', async (ctx, next) => {
  var img_id = ctx.request.body.fields.id;
  await new Promise((resolve, reject) => {
    Qiniu.deleteFile(img_id, function () {
      resolve();
    });
  });
  ctx.redirect('index');
});

module.exports = router;

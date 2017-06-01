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

router.post('/save', async (ctx, next) => {
  var file = ctx.request.body.files.test;
  await new Promise((resolve, reject) => {
    Qiniu.uploadFile(file.name, file.path, function () {
      resolve();
    });
  });
  ctx.redirect('/admin/index');
});

router.post('/delete', async (ctx, next) => {
  var img_id = ctx.request.body.fields.id;
  await new Promise((resolve, reject) => {
    Qiniu.deleteFile(img_id, function () {
      resolve();
    });
  });
  ctx.redirect('/admin/index');
});

module.exports = router;

const router = require('koa-router')();
const UserRepository = require('../orm/repository/userRepository');
const SessionRepository = require('../orm/repository/sessionRepository');
const News = require('../orm/model/news');
const Img = require('../orm/model/img');

// router.prefix('/users')

router.get('/logout', async (ctx, next) => {
  await ctx.cookies.set('sessionId', '');
  await ctx.render('logout');
});

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {});
});

router.post('/login', async (ctx, next) => {
  let username = ctx.request.body.username || '';
  let password = ctx.request.body.password || '';
  console.log('Login ' + username + ' ' + password);
  let user = await UserRepository.findOne({'username': username, 'password': password});
  if(user) {
    let session = await SessionRepository.findOne({'username': username});
    await ctx.cookies.set('sessionId', session.get('id'));
    await ctx.redirect('/admin/index');
  }
  else {
    await ctx.redirect('/login');
  }
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {});
});

router.post('/register', async (ctx, next) => {
  let username = ctx.request.body.username || '';
  let password = ctx.request.body.password || '';
  console.log('Register ' + username + ' ' + password);
  let user = await UserRepository.findOne({'username': username});
  if(user) {
    await ctx.redirect('/register');
  }
  else {
    await UserRepository.create(username, password);
    let session = await SessionRepository.create(username, username);
    await ctx.cookies.set('sessionId', session.get('id'));
    await ctx.redirect('/admin/index');
  }
});

module.exports = router;

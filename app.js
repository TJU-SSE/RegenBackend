const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const koaBody = require('koa-body');

const templating = require('./middleware/templating');

const test = require('./orm/module/test');

const index = require('./routes/index');
const users = require('./routes/users');
const news = require('./routes/news');
const redis = require('./routes/redis');

const checkAuthority = require('./middleware/authority');

const initDB = require('./orm/initDB');
initDB();

// error handler
onerror(app);

const isProduction = process.env.NODE_ENV === 'production';

// middlewares
app.use(koaBody({multipart: true}));
// app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// templating
app.use(views(__dirname + '/views', {
  options: {
    nunjucksEnv: templating('views', {
      noCache: !isProduction,
      watch: !isProduction
    })
  },
  map: {html: 'nunjucks'}
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// authority
// app.use(checkAuthority());


// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(news.routes(), news.allowedMethods());
// app.use(redis.routes(), redis.allowedMethods());


module.exports = app;

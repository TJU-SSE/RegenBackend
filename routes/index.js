var router = require('koa-router')();
var testRepository = require('../orm/repository/testRepository');

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

module.exports = router;

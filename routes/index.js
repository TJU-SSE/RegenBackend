var router = require('koa-router')();
var testRepository = require('../orm/repository/testRepository');
var upload = require('../utils/qiniu');

upload('kotori.jpg');

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

module.exports = router;

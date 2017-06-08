const router = require('koa-router')();

const ImgRepository = require('../orm/repository/imgRepository');
const NewsRepository = require('../orm/repository/newsRepository');
const Qiniu = require('../utils/qiniu');

router.prefix('/admin/news');

router.get('/create', async (ctx, next) => {
    let news = await NewsRepository.findOne({id: 28});
    let data = {};
    data.id = news.get('id');
    data.title = news.get('title');
    data.writer = news.get('writer');
    data.content = news.get('content');
    let img = await news.getCoverImg();
    data.url = img.get('url');
    await ctx.render('user_create', {news: data});
});

router.get('/createOne', async (ctx, next) => {
    await ctx.render('user_create_one');
});

router.post('/create', async (ctx, next) => {
    try {
        let file = ctx.request.body.files.img;
        let title = ctx.request.body.fields.title || '';
        let writer = ctx.request.body.fields.writer || '';
        let content = ctx.request.body.fields.content || '';
        let timestamp = Date.parse(new Date());
        Qiniu.uploadFile(timestamp, file.path, async function (img) {
            await NewsRepository.create(title, writer, content, img);
        });
        ctx.redirect('/admin/news/create');
    } catch (e) {
        ctx.redirect('/admin/news/create');
    }
});

router.post('/select', async (ctx, next) => {
    try {
        let id = ctx.request.body.id;
        if (!id) return;
        let news = await NewsRepository.findOne({id: id});
        if (!news) return;
        console.log(news);
        ctx.redirect('/admin/news/create');
    } catch (e) {
        ctx.redirect('/admin/news/create');
    }
});

router.post('/updateImg',  async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) return;
        let news = await NewsRepository.findOne({id: id});
        if (!news) return;
        let file = ctx.request.body.files.img;
        let timestamp = Date.parse(new Date());
        await Qiniu.uploadFile(timestamp, file.path, async function (img) {
            await NewsRepository.updateImg(news, img);
        });
        ctx.redirect('/admin/news/create');
    } catch(e) {
        ctx.redirect('/admin/news/create');
    }
});

router.post('/update', async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) return;
        let news = await NewsRepository.findOne({id: id});
        if (!news) return;
        let title = ctx.request.body.fields.title;
        let writer = ctx.request.body.fields.writer;
        let content = ctx.request.body.fields.content;
        console.log('update: ' + title + ' ' + writer + ' ' + content);
        await NewsRepository.update(news, title, writer, content);
        ctx.redirect('/admin/news/create');
    } catch(e) {
        ctx.redirect('/admin/news/create');
    }
});

router.post('/delete', async (ctx, next) => {
    try {
        let id = ctx.request.body.id;
        await NewsRepository.deleteOne({id: id});
        ctx.redirect('/admin/news/create');
    } catch (e) {
        ctx.redirect('/admin/news/create');
    }
});

module.exports = router;


// x-www-form-urlencoded -> body.xx;
// multipart/form-data -> body.fields;
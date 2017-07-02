const router = require('koa-router')();

const ProductService = require('../service/productService');
const ResponseService = require('../service/responseService');

// pre URL
router.prefix('/admin/product');

router.post('/select', async (ctx, next) => {
    try {
        let id = ctx.request.body.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let product = await ProductService.findOne({id: id});
        if (!product) { ctx.response.body = ResponseService.createErrResponse('Product not found'); return; }
        let ret = await ProductService.createProductViewModel(product);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

router.post('/create', async (ctx, next) => {
    try {
        let file = ctx.request.body.files.img;
        let title = ctx.request.body.fields.title || '';
        let session = ctx.request.body.fields.session || '';
        let releaseTime = ctx.request.body.fields.releaseTime || '';
        let introduction = ctx.request.body.fields.introduction || '';
        let timestamp = Date.parse(new Date());
        let ret = await ProductService.create(timestamp, file.path, title, session, releaseTime, introduction);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

router.post('/updateImg',  async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let product = await ProductService.findOne({id: id});
        if (!product) { ctx.response.body = ResponseService.createErrResponse('Product not found'); return; }
        let file = ctx.request.body.files.img;
        let timestamp = Date.parse(new Date());
        let ret = await ProductService.updateImg(product, timestamp, file.path);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch(e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

router.post('/update', async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let product = await ProductService.findOne({id: id});
        if (!product) { ctx.response.body = ResponseService.createErrResponse('Product not found'); return; }
        let title = ctx.request.body.fields.title || '';
        let session = ctx.request.body.fields.session || '';
        let releaseTime = ctx.request.body.fields.releaseTime || '';
        let introduction = ctx.request.body.fields.introduction || '';
        let ret = await ProductService.update(product, title, session, releaseTime, introduction);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch(e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

router.post('/delete', async (ctx, next) => {
    try {
        let id = ctx.request.body.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let ret = await ProductService.delete({id: id});
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

module.exports = router;


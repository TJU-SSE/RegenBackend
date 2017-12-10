const router = require('koa-router')();

const IndexProductService = require('../service/indexProductService');
const ProductService = require('../service/ProductService');
const ResponseService = require('../service/responseService');

// pre URL
router.prefix('/admin/indexProduct');


// OK
router.get('/getAll', async (ctx, next) => {
    try {
        let indexProducts = await IndexProductService.findAll();
        let ret = await IndexProductService.createIndexProductsViewModel(indexProducts);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/create', async (ctx, next) => {
    try {
        let productId = ctx.request.body.productId;
        if (!productId) { ctx.response.body = ResponseService.createErrResponse('ProductId not found'); return; }
        let product = await ProductService.findOne({id: productId});
        if (!product) { ctx.response.body = ResponseService.createErrResponse('Product not found'); return; }
        let rank = ctx.request.body.rank;
        if (!rank) { ctx.response.body = ResponseService.createErrResponse('Rank not found'); return; }
        let ret = await IndexProductService.create(product, rank);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/updateRanks', async (ctx, next) => {
    try {
        let ranks = ctx.request.body;
        let ret = await IndexProductService.updateRanks(ranks);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/delete', async (ctx, next) => {
    try {
        let id = ctx.request.body.productIndexId;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let IndexProduct = await IndexProductService.findOne({id: id});
        if (!IndexProduct) { ctx.response.body = ResponseService.createErrResponse('IndexProduct not found'); return; }
        let ret = await IndexProductService.delete(IndexProduct);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/deleteIndexProducts', async (ctx, next) => {
    try {
        let ids = ctx.request.body.productIds;
        if (!ids) { ctx.response.body = ResponseService.createErrResponse('Ids not found'); return; }
        let ret = await IndexProductService.deleteIndexProducts(ids);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

module.exports = router;

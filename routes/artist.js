const router = require('koa-router')();

const ArtistService = require('../service/artistService');
const ResponseService = require('../service/responseService');

// pre URL
router.prefix('/admin/artist');

// OK
router.get('/selectByName/:name', async (ctx, next) => {
    try {
        let name = ctx.params.name;
        if (!name) { ctx.response.body = ResponseService.createErrResponse('Name not found'); return; }
        let artist = await ArtistService.findOne({name: name});
        if (!artist) { ctx.response.body = ResponseService.createErrResponse('Artist not found'); return; }
        let ret = await ArtistService.createArtistViewModel(artist);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.get('/selectByIdentity/:identity', async (ctx, next) => {
    try {
        let identity = ctx.params.identity;
        if (!identity) { ctx.response.body = ResponseService.createErrResponse('Identity not found'); return; }
        let artists = await ArtistService.findAllFilter({identity: identity});
        if (!artists) { ctx.response.body = ResponseService.createErrResponse('Artists not found'); return; }
        console.log(ctx.query);
        let pageOffset = ctx.query.pageOffset || 0;
        let itemSize = ctx.query.itemSize || 0;
        let ret = await ArtistService.createArtistsViewModel(artists, pageOffset, itemSize);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.get('/select/:id', async (ctx, next) => {
    try {
        let id = ctx.params.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let artist = await ArtistService.findOne({id: id});
        if (!artist) { ctx.response.body = ResponseService.createErrResponse('Artist not found'); return; }
        let ret = await ArtistService.createArtistViewModel(artist);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/create', async (ctx, next) => {
    try {
        let file = ctx.request.body.files.img;
        let name = ctx.request.body.fields.name || '';
        let identity = ctx.request.body.fields.identity || '';
        let social = ctx.request.body.fields.social || '';
        let address = ctx.request.body.fields.address || '';
        let extraBiography = ctx.request.body.fields.extraBiography || '';
        let biography = ctx.request.body.fields.biography || '';
        let timestamp = Date.parse(new Date());
        let ret = await ArtistService.create(timestamp, file.path, name, identity, social, address, extraBiography, biography);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/update', async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let artist = await ArtistService.findOne({id: id});
        if (!artist) { ctx.response.body = ResponseService.createErrResponse('Artist not found'); return; }
        let name = ctx.request.body.fields.name || '';
        let identity = ctx.request.body.fields.identity || '';
        let social = ctx.request.body.fields.social || '';
        let address = ctx.request.body.fields.address || '';
        let extraBiography = ctx.request.body.fields.extraBiography || '';
        let biography = ctx.request.body.fields.biography || '';
        let ret = await ArtistService.update(artist, name, identity, social, address, extraBiography, biography);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch(e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/updateImg',  async (ctx, next) => {
    try {
        let id = ctx.request.body.fields.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let artist = await ArtistService.findOne({id: id});
        if (!artist) { ctx.response.body = ResponseService.createErrResponse('Artist not found'); return; }
        let file = ctx.request.body.files.img;
        let timestamp = Date.parse(new Date());
        let ret = await ArtistService.updateImg(artist, timestamp, file.path);
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch(e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

// OK
router.post('/delete', async (ctx, next) => {
    try {
        let id = ctx.request.body.id;
        if (!id) { ctx.response.body = ResponseService.createErrResponse('Id not found'); return; }
        let ret = await ArtistService.delete({id: id});
        ctx.response.body = ResponseService.createJSONResponse(ret);
    } catch (e) {
        ctx.response.body = ResponseService.createErrResponse(e);
    }
});

module.exports = router;

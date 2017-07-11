const ArtistRepository = require('../orm/repository/artistRepository');
const ArtistProductRepository = require('../orm/repository/artistProductRepository');
const ProductRepository = require('../orm/repository/productRepository');
const ArtistViewModel = require('../view_model/artist');
const Qiniu = require('../utils/qiniu');

let pub = {};

pub.findOne = async (filter) => {
    return await ArtistRepository.findOne(filter);
};

pub.findAllFilter = async (filter) => {
    return await ArtistRepository.findAllFilter(filter);
};

pub.create = async (key, localFile, name, identity, social, address, extraBiography, biography) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
            await ArtistRepository.create(name, identity, social, address, extraBiography, biography, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.updateImg = async (artist, key, localFile) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
            await ArtistRepository.updateImg(artist, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.update = async (artist, name, identity, social, address, extraBiography, biography) => {
    try {
        await ArtistRepository.update(artist, name, identity, social, address, extraBiography, biography);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.delete = async (filter) => {
    try {
        await ArtistRepository.deleteOne(filter);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.createArtistViewModel = async (artist) => {
    try {
        let id = artist.get('id');
        let name = artist.get('name');
        let identity = artist.get('identity');
        let social = artist.get('social');
        let address = artist.get('address');
        let extraBiography = artist.get('extraBiography');
        let biography = artist.get('biography');
        let viewcount = artist.get('viewcount');
        let img = await artist.getCoverImg();
        let img_id = img.get('id');
        let img_url = img.get('url');
        return ArtistViewModel.createArtist(id, name, identity, social, address, extraBiography, biography, viewcount, img_id, img_url);
    } catch (e) {
        console.log('123');
        return e;
    }
};

pub.createArtistsViewModel = async (artists, pageOffset, itemSize) => {
    try {
        let ret = { pageOffset: pageOffset, itemSize: itemSize, total: artists.length };
        let list = [];
        for(let x = pageOffset * itemSize; x < artists.length && x < pageOffset * itemSize + itemSize; x++ ) {
            let artist = artists[x];
            let id = artist.get('id');
            let name = artist.get('name');
            let identity = artist.get('identity');
            let img = await artist.getCoverImg();
            let img_id = img.get('id');
            let img_url = img.get('url');
            list.push(ArtistViewModel.createArtistBrief(id, name, identity, img_id, img_url))
        }
        ret['artists'] = list;
        return ret;
    } catch (e) {
        return e;
    }
};

pub.createArtistProduct = async (artist, product, rank) => {
    try {
        await ArtistProductRepository.create(artist, product, rank);
        return 'success';
    } catch (e) {
        return e;
    }
};

module.exports = pub;

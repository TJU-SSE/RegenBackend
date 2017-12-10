const IndexProductRepository = require('../orm/repository/indexProductRepository');
const IndexProductViewModel = require('../view_model/indexProduct');

let pub = {};

pub.findOne = async (filter) => {
    return await IndexProductRepository.findOne(filter);
};

pub.findAll = async () => {
    return await IndexProductRepository.findAll();
};

pub.create = async (news, rank) => {
    try {
        let indexProduct = await IndexProductRepository.create(news, rank);
        let id = indexProduct.get('id');
        return {id: id};
    } catch (e) {
        return e;
    }
};

pub.update = async (indexProduct, rank) => {
    try {
        await IndexProductRepository.update(indexProduct, rank);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.updateRanks = async (ranks) => {
    try {
        let indexProducts = await pub.findAll();
        for (let x in ranks) {
            let id = ranks[x].id;
            let rank = ranks[x].rank;
            console.log(id + ' ' + rank);
            for (let y in indexProducts) {
                let indexProduct = indexProducts[y];
                if (indexProduct.get('id') == id) {
                    await IndexProductRepository.update(indexProduct, rank);
                }
            }
        }
    } catch (e) {
        return e;
    }
};

pub.deleteIndexProducts = async (indexProductIds) => {
    try {
        for(let x in indexProductIds) {
            await IndexProductRepository.deleteOne({id: indexProductIds[x]});
        }
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.delete = async (indexProduct) => {
    try {
        await IndexProductRepository.delete(indexProduct);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.createIndexProductViewModel = async (indexProduct) => {

};

pub.createIndexProductsViewModel = async (indexProducts) => {
    try {
        let ret = [];
        for (let x in indexProducts) {
            let indexProduct = indexProducts[x];
            let id = indexProduct.get('id');
            let rank = indexProduct.get('rank');
            let product = await indexProduct.getProduct();
            let product_id = product.get('id');
            let title = product.get('title');
            let session = product.get('session');
            let releaseTime = product.get('releaseTime');
            let introduction = product.get('introduction');
            let img = await product.getCoverImg();
            let img_id = img.get('id');
            let img_url = img.get('url');
            let imgs = [];
            let productImgs = await product.getProductImgs();
            for(let x in productImgs) {
                let productImg = productImgs[x];
                let img1 = await productImg.getCoverImg();
                imgs.push({ img_id: img1.get('id'), img_url: img1.get('url') })
            }
            ret.push(IndexProductViewModel.createIndexProductsViewModel(id, product_id, title, session, releaseTime, introduction, img_id, img_url, imgs, rank));
        }
        return ret.sort((a, b) => {
            return a.rank - b.rank;
        });
    } catch (e) {
        return e;
    }
};

module.exports = pub;

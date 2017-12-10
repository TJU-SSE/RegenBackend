let pub = {};

pub.createIndexProductsViewModel = function (id, product_id, title, session, releaseTime, introduction, img_id, img_url, imgs, rank = -1) {
    return {
        id: id,
        product_id: product_id,
        title: title,
        session: session,
        releaseTime: releaseTime,
        introduction: introduction,
        img_id: img_id,
        img_url: img_url,
        imgs: imgs,
        rank: rank
    }
};

module.exports = pub;

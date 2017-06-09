const NewsRepository = require('../orm/repository/newsRepository');
const NewsViewModel = require('../view_model/news');
const Qiniu = require('../utils/qiniu');

let pub = {};

pub.findOne = async (filter) => {
    return await NewsRepository.findOne(filter);
};

pub.create = async (key, localFile, title, writer, content) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
                await NewsRepository.create(title, writer, content, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.updateImg = async (news, key, localFile) => {
    try {
        await Qiniu.uploadFile(key, localFile, async function (img) {
            await NewsRepository.updateImg(news, img);
        });
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.update = async (news, title, writer, content) => {
    try {
        await NewsRepository.update(news, title, writer, content);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.delete = async (filter) => {
    try {
        await NewsRepository.deleteOne(filter);
        return 'success';
    } catch (e) {
        return e;
    }
};

pub.createNewsViewModel = async (news) => {
    try {
        let id = news.get('id');
        let title = news.get('title');
        let writer = news.get('writer');
        let content = news.get('content');
        let img = await news.getCoverImg();
        let img_id = img.get('id');
        let img_url = img.get('url');
        return NewsViewModel.createNews(id, title, writer, content, img_id, img_url);
    } catch (e) {
        return e;
    }
};

module.exports = pub;

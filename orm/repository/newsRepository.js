const News = require('../model/news');
const Qiniu = require('../../utils/qiniu');

let findAll = async () => {
    let res = await News.findAll();
    return res;
};

let findOne = async (filter) => {
    let res = await News.findOne({where: filter});
    return res;
};

let create = async (title, writer, content, img) =>{
    let news = await News.create({ title: title, writer: writer, content: content});
    news.setCoverImg(img);
    return news;
};

let updateImg = async (news, img) => {
    let oldImg = await news.getCoverImg();
    console.log(oldImg);
    await Qiniu.deleteFile(oldImg);
    news.setCoverImg(img);
};

let update = async (news, title, writer, content) => {
    if(title) news.title = title;
    if(writer) news.writer = writer;
    if(content) news.content = content;
    await news.save();
};

let deleteOne = async (filter) => {
    let news = await findOne(filter);
    if (news) {
        let img = await news.getCoverImg();
        await Qiniu.deleteFile(img);
        await news.destroy();
    }
};

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    update: update,
    updateImg: updateImg,
    deleteOne: deleteOne
};

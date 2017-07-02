let pub = {};

pub.createNews = function (id, title, writer, content, img_id, url) {
    console.log(id, title, writer, content, img_id, url);
    return {id: id, title: title, writer: writer, content: content, img_id: img_id, url: url};
};

module.exports = pub;

const Img = require('./module/img');
const News = require('./module/news');
const Session = require('./module/session');
const Test = require('./module/test');
const User = require('./module/user');

function syncAll() {
    Img.sync().then(function () {
        console.log("create img success");
    });

    News.sync().then(function () {
        console.log("create news success");
    });

    Session.sync().then(function () {
        console.log("create session success");
    });

    Test.sync().then(function () {
        console.log("create test success");
    });

    User.sync().then(function () {
        console.log("create user success");
    });
}

let init = function () {

    // Img.hasOne(News, { foreignKey: 'cover_img' });
    // Img.hasOne(News, { foreignKey: 'cover_img'});
    News.belongsTo(Img, { foreignKey: 'cover_img', as: 'coverImg'});

    syncAll();
};


module.exports = init;

// 标题、时间、作者、正文、封面图片、TAG
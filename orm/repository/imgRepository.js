const Img = require('../model/img');

var findAll = async () => {
    let res = await Img.findAll();
    return res;
};

var findOne = async (filter) => {
    let res = await Img.findOne({where: filter});
    return res;
};

var create = async (id, url) =>{
    return await Img.create({
        id: id,
        url: url
    });
};

var deleteOne = async (test) => {
    await test.destroy();
};

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne
};

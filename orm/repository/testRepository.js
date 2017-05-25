const Test = require('../module/test');

var findAll = async () => {
	let res = await Test.findAll();
    var ret = [];
    for(var x in res) {
        var data = res[x].dataValues;
        var resData = {'id': data.id, 'name': data.name, 'url': data.url};
        ret.push(resData);
    }
    return ret;
};

var findOne = async (filter) => {
    let res = await Test.findOne({where: filter});
    return res;
};

var create = async (name, url) =>{
    return await Test.create({
        name: name,
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

const Test = require('../module/test');

var findAll = async () => {
	let res = await Test.findAll();
    return res;
};

var findOne = async (filter) => {
    let res = await Test.findOne({where: filter});
    return res;
};

var create = async (name, age) =>{
    return await Test.create({
        name: name,
        age: age
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

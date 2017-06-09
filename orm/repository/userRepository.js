const User = require('../model/user');

var findAll = async () => {
    let res = await User.findAll();
    return res;
};

var findOne = async (filter) => {
    let res = await User.findOne({where: filter});
    return res;
};

var create = async (username, password) =>{
    return await User.create({
        username: username,
        password: password
    });
};

var deleteOne = async (user) => {
    await user.destroy();
};

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne
};

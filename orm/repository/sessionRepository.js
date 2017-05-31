const Session = require('../module/session');

var findAll = async () => {
    let res = await Session.findAll();
    // var ret = [];
    // for(var x in res) {
    //     var data = res[x].dataValues;
    //     var resData = {'id': data.id, 'username': data.username};
    //     ret.push(resData);
    // }
    // return ret;
    return res;
};

var findOne = async (filter) => {
    let res = await Session.findOne({where: filter});
    return res;
};

var create = async (sessionId, username) =>{
    return await Session.create({
        id: sessionId,
        username: username
    });
};

var deleteOne = async (session) => {
    await session.destroy();
};

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne
};

let pub = {};

pub.createErrResponse = function(err) {
    console.log(err);
    return {
        code: '1',
        err: err
    };
};

pub.createJSONResponse = function (data) {
    // let res = JSON.stringify(data);
    return {
        code: '0',
        msg: data
    };
};

module.exports = pub;

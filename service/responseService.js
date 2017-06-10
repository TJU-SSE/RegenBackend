let pub = {};

pub.createErrResponse = function(err) {
    console.log(err);
    return { err: err };
};

pub.createJSONResponse = function (data) {
    return JSON.stringify(data);
};

module.exports = pub;

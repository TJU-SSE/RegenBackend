let createErrResponse = function(err) {
    console.log(err);
    return { err: err };
};

let createJSONResponse = function (data) {
    return JSON.stringify(data);
};

module.exports = {
    createErrResponse: createErrResponse,
    createJSONResponse: createJSONResponse
};

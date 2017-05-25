var qiniu = require('qiniu');
var conf = require('./config');
var TestRepository = require('../orm/repository/testRepository');

qiniu.conf.ACCESS_KEY = conf.ACCESS_KEY;
qiniu.conf.SECRET_KEY = conf.SECRET_KEY;

var uploadFile = async function(key, localFile, res) {
    var putPolicy = new qiniu.rs.PutPolicy(conf.bucket + ":" + key);
    var token = putPolicy.token();
    var extra = new qiniu.io.PutExtra();
    await qiniu.io.putFile(token, key, localFile, extra, async function(err, ret) {
        if (!err) {
            var url = conf.download + ret.key;
            var policy = new qiniu.rs.GetPolicy();
            var downloadUrl = policy.makeRequest(url);
            await TestRepository.create(ret.key, downloadUrl);
            res();
        } else {
            console.log(err);
        }
    });
};

var deleteFile = async function (id, res) {
    var client = new qiniu.rs.Client();
    var bucket = conf.bucket;
    let test = await TestRepository.findOne({'id': id});
    var key = test.name;
    client.remove(bucket, key, async function(err, ret) {
        if (!err) {
            await TestRepository.deleteOne(test);
            res();
        } else {
            console.log(err);
        }
    });
};

module.exports = {
    uploadFile: uploadFile,
    deleteFile: deleteFile
};

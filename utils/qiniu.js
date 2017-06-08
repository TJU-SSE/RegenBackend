var qiniu = require('qiniu');
var conf = require('./config');
var ImgRepository = require('../orm/repository/imgRepository');

qiniu.conf.ACCESS_KEY = conf.ACCESS_KEY;
qiniu.conf.SECRET_KEY = conf.SECRET_KEY;

var uploadFile = async function(key, localFile, res) {
    key += '';
    var putPolicy = new qiniu.rs.PutPolicy(conf.bucket + ":" + key);
    var token = putPolicy.token();
    var extra = new qiniu.io.PutExtra();
    console.log(key + ' ' + localFile);
    await qiniu.io.putFile(token, key, localFile, extra, async function(err, ret) {
        if (!err) {
            var url = conf.download + ret.key;
            var policy = new qiniu.rs.GetPolicy();
            var downloadUrl = policy.makeRequest(url);
            console.log('Rep: ' + ret.key + ' ' + downloadUrl);
            await ImgRepository.create(ret.key, downloadUrl);
            res();
        } else {
            console.log(err);
        }
    });
};

var deleteFile = async function (id, res) {
    var client = new qiniu.rs.Client();
    var bucket = conf.bucket;
    let img = await ImgRepository.findOne({'id': id});
    var key = id;
    client.remove(bucket, key, async function(err, ret) {
        if (!err) {
            await ImgRepository.deleteOne(img);
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

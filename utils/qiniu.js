var qiniu = require('qiniu');
var conf = require('./config');

qiniu.conf.ACCESS_KEY = conf.ACCESS_KEY;
qiniu.conf.SECRET_KEY = conf.SECRET_KEY;

var uploadFile = function(key) {
    var putPolicy = new qiniu.rs.PutPolicy(conf.bucket + ":" + key);
    var token = putPolicy.token();
    var localFile = conf.filePath + key;
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
        if (!err) {
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            console.log(err);
        }
    });
};

module.exports = uploadFile;

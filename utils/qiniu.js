var qiniu = require('qiniu');
var conf = require('./config');

qiniu.conf.ACCESS_KEY = conf.ACCESS_KEY;
qiniu.conf.SECRET_KEY = conf.SECRET_KEY;

var uploadFile = function(key, localFile) {
    var putPolicy = new qiniu.rs.PutPolicy(conf.bucket + ":" + key);
    var token = putPolicy.token();
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
        if (!err) {
            console.log(ret.hash, ret.key, ret.persistentId);
            var url = conf.download + ret.key;
            var policy = new qiniu.rs.GetPolicy();
            var downloadUrl = policy.makeRequest(url);
            console.log(downloadUrl);
        } else {
            console.log(err);
        }
    });
};

module.exports = uploadFile;

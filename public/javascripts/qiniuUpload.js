const qiniu = require('qiniu');
const url = require('url')
const http = require('http')
const sizeOf = require('image-size')

const accessKey = '.......';
const secretKey = '.......';
const qiniu_bucket = '.......';
const qiniu_file_hostname =  '.......';

// mac鉴权 && 构建 BucketManager对象
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

var save2Qiniu = function (req, res, next) {
    let resObj = {
        errno: 0,
        message: '',
        data: []
    }
    let bodyObj = req.body;
    let links = bodyObj.links;

    if (!links || links.length == 0) {
        resObj = {
            errno: 0,
            message: '参数不能为空',
            data: []
        }
    } else {
        let linkArr = links.split(',,');
        let promiseArr = [];
        for (let i in linkArr) {
            let linkStr = qUpload.init(linkArr[i]);
            promiseArr.push(qUpload.qiniuUpload(linkStr))
        }
        Promise.all(promiseArr).then(resolve => {
            resObj = {
                errno: 0,
                message: '转存成功',
                data: resolve
            }
            res.result = resObj
            next()
        }, reject => {
            resObj = {
                errno: 1,
                message: '转存失败',
                data: reject
            }
            res.result = resObj
            next()
        }).catch(err => {
            resObj = {
                errno: 2,
                message: '转存报错',
                data: err
            }
            res.result = resObj
            next()
        })
    }
}

var qUpload = {
    qiniuUpload: function (resUrl) {
        return new Promise((resolve, reject) => {
            this.getImageType(resUrl).then(res => {
                var key = this.timestamp() + '.' + res.type
                bucketManager.fetch(resUrl, qiniu_bucket, key, function (err, respBody, respInfo) {
                    if (err) {
                        console.log('getImageType -- > ', err);
                        throw new Error(err)
                    } else {
                        if (respInfo.statusCode == 200) {
                            // console.log(`${respBody.key} \r\n ${respBody.hash} \r\n ${respBody.fsize} \r\n ${respBody.mimeType}`);
                            let url = qiniu_file_hostname + '/' + respBody.key
                            console.log(`转存链接  === > ${url}`)
                            resolve(url)
                        } else {
                            let errObj = {
                                statusCode: respInfo.statusCode,
                                resBody: respBody
                            }
                            reject(errObj)
                        }
                    }
                });
            })
        })
    },
    getImageType: function (resUrl) {
        var options = url.parse(resUrl);
        return new Promise((resolve, reject) => {
            http.get(options, function (response) {
                var chunks = [];
                response.on('data', function (chunk) {
                    chunks.push(chunk);
                }).on('end', function () {
                    var buffer = Buffer.concat(chunks);
                    let props = sizeOf(buffer)
                    resolve(props)
                });
            });
        })
    },

    timestamp: function () {
        var now = new Date;//如果date为13位不需要乘1000
        var Y = now.getFullYear();
        var M = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
        var D = (now.getDate() < 10 ? '0' + (now.getDate()) : now.getDate());
        var h = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours());
        var m = (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
        var s = (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());
        var time = now.getTime()

        return Y + M + D + h + m + s + time;
    },

    init: function (resUrl) {
        return resUrl.replace('https', 'http')
    }
}

module.exports = save2Qiniu
var express = require('express');
var router = express.Router();

var qUpload = require('../public/javascripts/qiniuUpload')

router.post('/post/test', qUpload, function (req, res, next) {
    res.send(res.result);
});

router.get('/get/test', function (req, res, next) {
    res.send('qiniu post');
})


module.exports = router;
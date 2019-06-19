var express = require('express');
var router = express.Router();

var qUpload = require('../public/javascripts/qiniuUpload')

// var resUrl = 'http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvN1FSVHZrSzJxQzU4R3VIdGxHMk9RZnFjWUhBZjFPa3g5cVc2NlNxa3dqMER0MWVEd3lpY29lMGg4MHhZbGNzUFhlQjhKdHhLN2R1UXM4YTU4c0ppYVNPZy8wP3d4X2ZtdD1wbmc='
// qUpload.init(resUrl)

router.post('/post/test', function (req, res, next) {
    let bodyObj = req.body;
    let links = bodyObj.links;
    if (links.length == 0) {
        res.send('参数不能为空');
    } else {
        let linkArr = links.split(',,')
        for(let i in linkArr){
            
        }
        console.log('links.length --- > \r\n', linkArr);

        res.send('links.length === > ' + links.length);
    }
});

router.get('/get/test', function (req, res, next) {
    res.send('qiniu post');
})


module.exports = router;
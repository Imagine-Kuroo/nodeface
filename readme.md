#### 项目运行如下：
+ npm install
+ npm start

#### 只需要修改qiniuUpload.js里参数换成自己七牛云账号对应的配置即可
``` javascript
    const accessKey = '.......';
    const secretKey = '.......';
    const qiniu_bucket = '.......';
    const qiniu_file_hostname =  '.......';
```

#### 服务器上pm2配置如下：

``` json
    {
        "name": "nodeface",
        "script": "node ./bin/www",
        "ignore_watch": [
            "node_modules",
            "logs"
        ],
        "error_file": "./logs/app-err.log",
        "out_file": "./logs/app-out.log",
        "env": {
            "PORT": 3004,
            "NODE_ENV": "production"
        }
    }
```

#### 可以在本机使用postman
+ 通过这个接口进行访问http://127.0.0.1:3000/interface/post/test
+ 输入参数 links：links为多个第三方链接通过,,分隔拼成的字符串
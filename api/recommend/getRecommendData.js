const {recommendTable} = require("./recommendTable");

// 使用 Express框架 可以快速地搭建一个完整功能的网站
const express = require("express");
let app = express();

app.all("*", function (req, res, next) { //解决跨域请求问题
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    });
    if (req.method === "OPTIONS") {
        res.send(200)
        // eslint-disable-next-line no-console
        console.log("has option")
    } else {
        next()
    }
});

// get请求http://127.0.0.1:1234/api/getRecommendData中的数据
app.get("/api/getRecommendData", function (req, res) {
    // 从数据表recommendTable中查询数据,除了__v和_id
    recommendTable.find({},{
            __v:false,
            _id:false
        })
        .then((data) => {
            // eslint-disable-next-line no-console
            console.log("查询成功");
            // 查询数据成功后,传送http响应的数据
            res.send(JSON.stringify(data))
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            if (err) throw err;
            console.log("查询失败"+err);
        });
});
app.listen(1234);
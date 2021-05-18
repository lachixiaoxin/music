const request = require("request");
const fs=require("fs");
const { detailTable } = require("./detailTable");

// jsdom最强大的功能是它可以在jsdom中执行脚本,详见npmjs官网
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const express=require("express");
let app=express();

// get请求http://127.0.0.1:1234/api/recommendDetail/7098812364中的数据
app.get("/api/recommendDetail/:id",function(req,res) {
    //查询数据表detailTable中是否存在此id的数据
    detailTable
    .find({
        id: req.params.id
    })
    .then(data => {
        // eslint-disable-next-line no-console
        // console.log(Number(data)); 
       
        if (Number(data) === 0) { //或 data.length===0
            // eslint-disable-next-line no-console
            console.log("此时数据库中无数据");
            // 此时数据库中无数据,从下面的地址中请求数据
            request(
                {
                    method: "GET",
                    url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
                    qs: {
                        ADTAG: "newyqq.taoge",
                        id: req.params.id
                    }
                },
                function(error, response, body) {
                    //请求数据,返回的不是json数据是html,因此使用jsdom
                    // runScripts: "dangerously"选项将js激活,否则得到的就是dom
                    const dom = new JSDOM(body, { runScripts: "dangerously" });
                    let songlist = dom.window.firstPageData;
                    //查询是否已存在数据
                    let finalData = {}; //存储待添加到数据库的数据
                    finalData.id = req.params.id; //设置歌单id
                    finalData.cover = songlist.taogeData.picurl || songlist.taogeData.headurl; //设置歌单封面
                    finalData.title = songlist.taogeData.title; //设置专辑标题
                    finalData.tag = []; //预设一个空的数据,存储专辑类型
                    finalData.songlist = []; //预设一个空的数据,存储专辑歌曲列表
                    songlist.taogeData.tag.forEach(item => {
                        finalData.tag.push({
                            id: item.id,
                            name: item.name
                        });
                    });
                    songlist.taogeData.songlist.forEach(item => {
                        let singer = [];
                        item.singer.forEach(singerList => {
                            singer.push(singerList);
                        });
                        finalData.songlist.push({
                            songMid: item.mid,
                            songName: item.name,
                            songAlbum:songlist.taogeData.title,
                            singer: singer
                        });
                    });
                    // 将数据写入到数据表detailTable中
                    detailTable.create(finalData)
                    .then(()=>{
                        // eslint-disable-next-line no-console
                        console.log("写入数据库成功");
                    }).catch((err)=>{
                      // eslint-disable-next-line no-console
                        console.log("写入数据库失败"+err);
                    })
                }
            );
        } else {
            // eslint-disable-next-line no-console
            console.log("此时数据库中有数据");
            res.send(JSON.stringify(data));
        }
    });
    /*
    request(
        {
            method: "GET",
            url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
            qs: {
                ADTAG: "newyqq.taoge",
                id:req.params.id
            }
        },
        function(error, response, body) {
            //请求数据,返回的不是json数据是html,因此使用jsdom
            // runScripts: "dangerously"选项将js激活,否则得到的就是dom
            const dom = new JSDOM(body, { runScripts: "dangerously" });
            let songlist = JSON.stringify(dom.window.firstPageData);
            // 请求数据并写入本地 
            // fs.writeFile(`${__dirname}/body.json`,body,{
            //     encoding:"utf-8"
            // },(err)=>{
            //     if (err) throw err;
            //     console.log("写入body数据成功");
            // }),
            // fs.writeFile(`${__dirname}/demo.json`,songlist,{
            //     encoding:"utf-8"
            // },(err)=>{
            //     if (err) throw err;
            //     console.log("写入songlist数据成功");
            // })

           res.send(songlist)
        }
    );*/
});
app.listen(1235);


/*
module.exports = {
    getRecommendDetailData: function(req, res) {
        // eslint-disable-next-line no-console
        console.log("getRecommendDetailData api 运行")
        //查询数据表detailTable中是否存在此id的数据
        detailTable
            .find({
                id: req.params.id
            })
            .then(data => {
                // eslint-disable-next-line no-console
                // console.log(Number(data)); 
               
                if (Number(data) === 0) { //或 data.length===0
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中无数据");
                    // 此时数据库中无数据,从下面的地址中请求数据
                    request(
                        {
                            method: "GET",
                            url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
                            qs: {
                                ADTAG: "newyqq.taoge",
                                id: req.params.id
                            }
                        },
                        function(error, response, body) {
                            //请求数据,返回的不是json数据是html,因此使用jsdom
                            // runScripts: "dangerously"选项将js激活,否则得到的就是dom
                            const dom = new JSDOM(body, { runScripts: "dangerously" });
                            let songlist = dom.window.firstPageData;
                            //查询是否已存在数据
                            let finalData = {}; //存储待添加到数据库的数据
                            finalData.id = req.params.id; //设置歌单id
                            finalData.cover = songlist.taogeData.picurl || songlist.taogeData.headurl; //设置歌单封面
                            finalData.title = songlist.taogeData.title; //设置专辑标题
                            finalData.tag = []; //预设一个空的数据,存储专辑类型
                            finalData.songlist = []; //预设一个空的数据,存储专辑歌曲列表
                            songlist.taogeData.tag.forEach(item => {
                                finalData.tag.push({
                                    id: item.id,
                                    name: item.name
                                });
                            });
                            songlist.taogeData.songlist.forEach(item => {
                                let singer = [];
                                item.singer.forEach(singerList => {
                                    singer.push(singerList);
                                });
                                finalData.songlist.push({
                                    songMid: item.mid,
                                    songName: item.name,
                                    songAlbum:songlist.taogeData.title,
                                    singer: singer
                                });
                            });
                            res.send(JSON.stringify(finalData));
                            // 将数据写入到数据表detailTable中
                            detailTable.create(finalData);
                        }
                    );
                } else {
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中有数据");
                    res.send(JSON.stringify(data));
                }
            });
    }
};*/
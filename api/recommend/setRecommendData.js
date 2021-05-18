const request=require("request");
const fs=require("fs");
const {recommendTable}=require("./recommendTable")

request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs: {//查询数据
        "cgiKey": "GetHomePage",
        "_": 1576499692284,
        "data": `{ "comm": { "g_tk": 155916146, "uin": 647789540, "format": "json", "inCharset": "utf-8", "outCharset": "utf-8", "notice": 0, "platform": "h5", "needNewCode": 1 }, "MusicHallHomePage": { "module": "music.musicHall.MusicHallPlatform", "method": "MobileWebHome", "param": { "ShelfId": [101, 102, 161] } }, "hotkey": { "module": "tencent_musicsoso_hotkey.HotkeyService", "method": "GetHotkeyForQQMusicMobile", "param": { "remoteplace": "txt.miniapp.wxada7aab80ba27074", "searchid": "1559616839293" } } }`
    }
},async(err,res,body)=>{
    //将请求的数据写入到当前目录的demo.json文件中
    // fs.writeFile(`${__dirname}/demo.json`,body,{
    //     encoding:"utf-8"
    // },(err)=>{
    //     if (err) throw err;
    //     console.log("写入数据成功");
    // })

    // 将请求的数据存储在自己的数据表中
    // 删除recommendTable表的内容,删除完成后执行后面的代码
    await recommendTable.deleteMany({});
    //将body字符串转成json数据
    let data = JSON.parse(body).MusicHallHomePage.data.v_shelf; //获取所有的推荐分区信息
    data.forEach((item) => {
        let category = item.title_template; //获取分区的名称
        let categoryList = item.v_niche[0].v_card; //获取该分区里面的详细歌单列表
        let arr = [];//用于存储我们要保存到数据表中的数据categoryList
        categoryList.forEach((list) => {
            // console.log("详细id:" + list.id);
            // console.log("歌单名词:" + list.title);
            // console.log("歌单封面地址:" + list.cover);
            if (list.time) {
                arr.push({
                    id: list.time,
                    title: list.title,
                    cover: list.cover
                })
            } else {
                arr.push({
                    id: list.id,
                    title: list.title,
                    cover: list.cover
                })
            }
        });
        if(arr.length!==0){
            // 将数据写入到数据表recommendTable中
            recommendTable.create({
                category: category,
                categoryList: arr
            }).then(()=>{
                // eslint-disable-next-line no-console
                console.log("写入数据库成功");
            }).catch((err)=>{
              // eslint-disable-next-line no-console
                console.log("写入数据库失败"+err);
            })
        }
    })
})

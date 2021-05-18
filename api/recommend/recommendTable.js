// 将请求的数据存到自己设计的数据表中
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

// 连接数据库，数据库名music
mongoose.connect("mongodb://127.0.0.1:27017/music",{
    useNewUrlParser:true,//选项来确保您提供的连接字符串对于新的解析器有效MongoClient.connect()
    useUnifiedTopology:true //使用新的服务器发现和监视引擎
}).then(() => {
    console.log("连接数据库成功")
}).catch((err) => {
    console.log("连接数据库失败"+err)
});

//创建数据表的规则
let recommendShema = new Schema({
    category: {
        required: true,
        type: String
    },
    categoryList: [
        {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            // 封面
            cover: {
                type: String,
                required: true
            }
        }
    ]
})

// 创建数据表recommendDates并传入规则schema 
let recommendDatas = mongoose.model("recommendDatas", recommendShema);
module.exports={//导出表recommendTable
    recommendTable:recommendDatas
}


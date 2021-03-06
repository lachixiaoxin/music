const  mongoose = require("mongoose");
const  Schema = mongoose.Schema;

// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/music",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    // eslint-disable-next-line no-console
    console.log("连接数据库成功")
}).catch(()=>{
    // eslint-disable-next-line no-console
    console.log("连接数据库失败")
});

// 数据表规则
let detailSchema= new Schema({
    id:{//用作于后期的数据识别
        required:true,
        type:String
    },
    cover:{//封面
        required: true,
        type:String
    },
    title:{//歌单名词
        required: true,
        type:String
    },
    tag:[// 歌单种类
        {
            id:{
                required: true,
                type:Number
            },
            name:{
                required: true,
                type:String
            }
        }
    ],
    songlist:[
        {
            songMid: {
                required: true,
                type: String
            },
            songName: {
                required: true,
                type: String
            },
            songAlbum: {
                required: true,
                type: String
            },
            singer:[
                {
                    id: { // 歌手的id
                        required: true,
                        type:String
                    },
                    mid: { // 歌手的mid
                        required: true,
                        type:String
                    },
                    name: { // 歌手的名字
                        required: true,
                        type:String
                    },
                    title: { // 歌手的名字
                        required: true,
                        type:String
                    }
                }
            ]
        }
    ]
});

// 创建数据表detailTables,并传入数据的规则
let detailTable=mongoose.model("detailTables",detailSchema);

// 导出数据表
module.exports={
    detailTable
};
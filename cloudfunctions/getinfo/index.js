// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//初始化database
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //将查询到的所有数据返回
  return db.collection('doubanmovie').get()
}
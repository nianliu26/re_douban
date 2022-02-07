// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  let type=event.type
  let result

//点赞按钮触发数据库添加数据
  if(type=='add'){
    result=await db.collection('goods').add({
      data:{
        remarkid:event.remarkid,
        openid:event.openid
      }
    })
  }

//再次点击取消点赞触发数据库删除数据
  if(type=='delete'){
    result=await db.collection('goods')
    .where({
      remarkid:event.remarkid
    }).remove()
  }

//获取对应评论点赞数据
  if(type=='select'){
    result=await db.collection('goods')
    .where({
      remarkid:event.remarkid,
      openid:event.openid
    }).get()
  }

  return result

}
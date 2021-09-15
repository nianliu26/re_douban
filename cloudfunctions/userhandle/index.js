// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  //从event中获取内容
  let type=event.type
  let user_info=event.user


  let add = await db.collection('users').add({
    data:{
      username:user_info.username,
      userkeyworld:user_info.keyworld
    }
  })

  return add
}
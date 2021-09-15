// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
let cmd=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let type=event.type
  let result

  if(type=='add'){
    result=await db.collection('movieww').add({
      data:{
        openid:event.openid,
        movieid:event.movieid,
        movietitle:event.movietitle,
        movieimage:event.movieimage,
        option:event.option
      }
    })
  }
  if(type=='select'){
    result= await db.collection('movieww').where({
      openid:event.openid,
      movieid:event.movieid,
      movietitle:event.movietitle,
      movieimage:event.movieimage,
      option:event.option
    })
    .get()
  }

  if(type=='delete'){
    result=await db.collection('movieww').where({
      openid:event.openid,
      movieid:event.movieid
    }).remove()
  }

  if(type=='updata'){
    result=await db.collection('movieww').where({
      openid:event.openid,
      movieid:event.movieid
    }).update({
      data:{
        option:event.option
      }
    })
  }

  return result
}
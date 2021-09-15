// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database()
let col=db.collection('remark')

// 云函数入口函数
exports.main = async (event, context) => {
  let type=event.type
  let result


//评论功能：可以添加评论，查看评论、删除评论、评论点赞、获取对应电影评论数目

//条件评论，即用户发布评论
  if(type=="add"){
    result=await col.add({
      data:{
        movieid:event.movieid,//电影id
        openid:event.openid,//评论人id
        nickname:event.nickname,//评论者昵称
        avatarUrl:event.avatarUrl,//评论者头像
        rate:event.rate,//个人评分
        data:event.data,//评论日期
        remark:event.remark,//评论内容
        goods:'0'//获赞次数
      }
    })
  }


//获取对应电影评论及数目
  if(type=='remarkacount'|| type=='select'){
    result=await col.where({
      movieid:event.movieid
    }).get()
    if(type=='remarkacount'){
      result=result.data.length
    }
  }

//删除评论
  if(type=='delete'){
    result=await col.where({
      _id:event.remarkid//评论id
    }).remove()
  }

//点赞触发对应评论数据更改：点赞数加一,只有点赞时触发
  if(type=='updata'){
    let data=await col.where({
      _id:event.remarkid
    }).get()

    let good=data[0].goods+1
    result=await col.where({
      _id:event.remarkid
    }).update({
      data:{
        goods:good
      }
    })
  }


  return result


}
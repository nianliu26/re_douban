// pages/allremark/allremark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rate:'6.0',
    moviename:'',
    acount:'200',
    //评论信息列表，包括评论者的基本信息、评论内容、评星数据和点赞信息
    remarklist:[
      {
        _id:'123',//评论id
        movieid:'111',//电影id
        openid:'222',//评论人id
        nickname:'昵称',
        avatarUrl:'/img/default.png',
        rate:'5',
        data:'8月9日',
        remark:'今天是个好日子呀埃里克解放路卡等级分类看见了看见的弗兰克极乐空间联发科解放路科技看到几个老师开房间隔离开关了女老师发个链接akjfdlkdjfldjlkdjfkladjflakdjfldkjflncladglhlclnlla',
        goods:'2000',
        goodURL:'/img/good.png'
      }
    ],

    loading:true,

  },


  /**
   * 点赞按钮功能，点击一次就为对应评论点赞，如果是已经点赞的状态再次点击则取消点赞,未登录不可点赞
   * @param {*} e 
   */
  setGood(e){
    //console.log(e)
    let that=this
    let app=getApp()
    let i=e.currentTarget.dataset.i
    let url='remarklist['+i+'].goodURL'
    if(app.globalData.userOpenID!=''){
      if(that.data.remarklist[i].goodURL=='/img/good.png'){
        //console.log(url)
        that.setData({
          [url]:'/img/good1.png'
        })
        // console.log("点赞数：")
        // console.log(that.data.remarklist)
        let goods=that.data.remarklist[i].goods
        goods=parseInt(goods)+1
        goods=goods+''
        console.log(goods)
        var m='remarklist['+i+'].goods'
        that.setData({
          [m]:goods
        })


        // console.log('改变成功')
        // console.log(that.data.remarklist[i])

        wx.cloud.callFunction({
          name:'goods',
          data:{
            type:'add',
            remarkid:that.data.remarklist[i]._id,
            openid:that.data.openid
          },
          success(res){
            //console.log(res)
            wx.cloud.callFunction({
              name:'remark',
              data:{
                type:'updata',
                down:'good',
                remarkid:that.data.remarklist[i]._id,
              },
              success(res){
                //console.log(res)
                
              },
              fail(err){
                console.log(err)
              }
            })
          },
          fail(err){
            console.log(err)
          }
        })
      }else if(that.data.remarklist[i].goodURL=='/img/good1.png'){
        that.setData({
          [url]:'/img/good.png'
        })
        let goods=that.data.remarklist[i].goods
        goods=parseInt(goods)-1
        goods=goods+''
        var m='remarklist['+i+'].goods'
        that.setData({
          [m]:goods
        })
        // console.log('改变成功')
        //console.log(that.data.remarklist[i])

        wx.cloud.callFunction({
          name:'goods',
          data:{
            type:'delete',
            remarkid:that.data.remarklist[i]._id
          },
          success(res){
            //console.log(res)
            wx.cloud.callFunction({
              name:'remark',
              data:{
                type:'updata',
                down:'cancle',
                remarkid:that.data.remarklist[i]._id,
              },
              success(res){
                
              },
              fail(err){
                console.log(err)
              }
            })
          },
          fail(err){
            console.log(err)
          }
        })
      }
    }else{
      wx.showToast({
        title: '清先登录',
        image:'/img/failure.png'
      })
    }

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    let movieid=parseInt(options.movieid)
    //let movieid=25905044
    //console.log('movieid:'+movieid)
    let that=this
    

    wx.cloud.init()
    let db=wx.cloud.database()

    db.collection('doubanmovie')
    .where({
      _id:movieid
    }).get({
      success(res){
        //console.log(res)
        that.setData({
          rate:res.data[0].rate,
          moviename:res.data[0].title
        })

        var t
          var index=that.data.moviename.indexOf(' ')
          if(index==-1) t=that.data.moviename
          t=that.data.moviename.substring(0,index)

        wx.setNavigationBarTitle({
          title: '《'+t+'》的短评',
        })


        wx.cloud.callFunction({
          name:'remark',
          data:{
            type:'remarkacount',
            movieid:movieid
          },
          success(res){
            console.log(res)
            that.setData({
              acount:res.result
            })
            if(that.data.acount!=0){
              wx.cloud.callFunction({
                name:'remark',
                data:{
                  type:'select',
                  movieid:movieid
                },
                success(res){
                  //console.log(res)
                  that.setData({
                    remarklist:res.result.data,
                  })

                  //设置点赞图标
                  for(let i in that.data.remarklist){
                    //console.log(that.data.remarklist[i]._id,)
                    wx.cloud.callFunction({
                      name:'goods',
                      data:{
                        type:'select',
                        remarkid:that.data.remarklist[i]._id,
                        openid:that.data.openid
                      },
                      success(res){
                        let str="remarklist["+i+'].goodURL'
                        //console.log('当前openid:'+that.data.openid)
                        //console.log(res.result)
                        for(var nam in res.result.data){
                          if(res.result.data[nam].openid==app.globalData.userOpenID){
                            that.setData({
                              [str]:'/img/good1.png'
                            })
                            // console.log('当前评论列表:')
                            // console.log(that.data.remarklist)
                          }
                        }
                        that.setData({
                          loading:false
                        })
                      },
                      fail(err){
                        console.log(err)
                      }
                    })
                  }


                  //console.log('结束')
                },
                fail(err){
                  console.log(err)
                }
              })
            
            }else{
              that.setData({
                remarklist:[],
                loading:false,
              })
            }
          },
          fail(err){
            console.log(err)
          }
        })

        
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
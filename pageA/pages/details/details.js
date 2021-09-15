// pages/details/details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

    //电影数据
    movie:{
        image:'/img/default.png',
        title:'影片名称啊啊啊啊啊啊啊啊啊啊啊啊',
        rate:'8.5'
    },


    //模拟用户数据
    nickname:'微信用户',
    openid:'1111',
    avatarUrl:'https://cdn.pixabay.com/photo/2020/07/21/16/24/landscape-5426755_960_720.jpg',
    //评论数据
    remark_acount:'0',
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
        goods:'2000'
      }
    ],

    //收藏电影的数据
    option:'',
    want_color:'white',
    watched_color:'white',


    loading:true,
  },


  want(){
    let that=this
    let app=getApp()
    wx.cloud.init()

    let movie=this.data.movie

    if(this.data.option==''){
      if(app.globalData.userOpenID==''){
        //为登录不能点击想看
        wx.showToast({
          title: '请先登录',
          image:'/img/failure.png'
        })
      }else{
        //console.log("当前电影")
        //console.log(movie)
        //点击想看成功
        wx.cloud.callFunction({
          name:'movieww',
          data:{
            type:'add',
            openid:app.globalData.userOpenID,
            movieid:movie[0]._id,
            movietitle:movie[0].title,
            movieimage:movie[0].image,
            option:'want'
          },
          success(){
            wx.showToast({
              title: '添加成功',
            })
            that.setData({
              want_color:'pink'
            })
          },
          fail(err){
            console.log(err)
          }
        })
        this.setData({
          option:'want'
        })
        }
    }else if(this.data.option=='watched'){
      //将看过切换为想看
      //console.log('切换成功')
      wx.cloud.callFunction({
        name:'movieww',
        data:{
          type:'updata',
          openid:app.globalData.userOpenID,
          movieid:movie[0]._id,
          option:'want'
        },
        success(res){
          wx.showToast({
            title: '添加成功',
          })
          that.setData({
            watched_color:'white',
            want_color:'pink',
            option:'want'
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }else if(this.data.option=='want'){
      //取消想看状态
      //console.log('取消成功')
      wx.cloud.callFunction({
        name:'movieww',
        data:{
          type:'delete',
          openid:app.globalData.userOpenID,
          movieid:movie[0]._id,
        },
        success(res){
          that.setData({
            option:'',
            want_color:'white',
            watched_color:'white',
          })
        },
        fail(err){
          console.log(err)
        }
      })

    }
  },


  watched(){
    let that=this
    let app=getApp()
    let movie=this.data.movie
    wx.cloud.init()

    if(this.data.option==''){
      if(app.globalData.userOpenID==''){
        wx.showToast({
          title: '请先登录',
          image:'/img/failure.png'
        })
      }else{
        wx.cloud.callFunction({
          name:'movieww',
          data:{
            type:'add',
            openid:app.globalData.userOpenID,
            movieid:movie[0]._id,
            movietitle:movie[0].title,
            movieimage:movie[0].image,
            option:'watched'
          },
          success(){
            wx.showToast({
              title: '添加成功',
            })
            that.setData({
              watched_color:'pink'
            })
          },
          fail(err){
            console.log(err)
          }
        })
        this.setData({
          option:'watched'
        })
      }
    }else if(this.data.option=='want'){
      //console.log('开始切换')
      wx.cloud.callFunction({
        name:'movieww',
        data:{
          type:'updata',
          openid:app.globalData.userOpenID,
          movieid:movie[0]._id,
          option:'watched'
        },
        success(res){
          wx.showToast({
            title: '添加成功',
          })
          that.setData({
            watched_color:'pink',
            want_color:'white',
            option:'watched'
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }else if(this.data.option=='watched'){
      //console.log('开始取消')
      wx.cloud.callFunction({
        name:'movieww',
        data:{
          type:'delete',
          openid:app.globalData.userOpenID,
          movieid:movie[0]._id,
        },
        success(res){
          that.setData({
            option:'',
            want_color:'white',
            watched_color:'white',
          })
        },
        fail(err){
          console.log(err)
        }
      })

    }
  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    wx.cloud.init({
      traceUser: true,
    })

    let id=parseInt(options.id);
    let db=wx.cloud.database();
    let that=this;

    //获取电影数据以及收藏信息
    db.collection('doubanmovie')
      .where({
        _id: id
      })
      .get({
        success(res) {
          that.setData({
            movie: res.data,
          })

          wx.setNavigationBarTitle({
            title: that.data.movie[0].title,
          })
          wx.cloud.callFunction({
            name: 'movieww',
            data: {
              type: 'select',
              openid: app.globalData.userOpenID,
              movieid: that.data.movie[0]._id
            },
            success(res) {
              //console.log("查询结果")
              //console.log(res)
              if (res.result.data == '') {
                that.setData({
                  loading: false
                })
              } else {
                if (res.result.data[0].option == 'want') {
                  that.setData({
                    want_color: 'pink',
                    watched_color: 'white',
                    option: 'want',
                    loading: false
                  })
                } else if (res.result.data[0].option == 'watched') {
                  that.setData({
                    watched_color: 'pink',
                    want_color: 'white',
                    option: 'watched',
                    loading: false
                  })
                }
              }
            }
          })

          //获取评论数据
          //获取评论数量
          wx.cloud.callFunction({
            name:'remark',
            data:{
              type:'remarkacount',
              movieid:that.data.movie._id
            },
            success(res){
              //console.log(res)
              that.setData({
                remark_acount:res.result
              })
              //console.log(that.data.remark_acount)
            }
          })

          //获取5条评论数据，用于详情页面显示
          //let db=wx.cloud.database()
          console.log('当前电影数据')
          console.log(that.data.movie)
          db.collection('remark')
          console.log(that.data.movie[0]._id)
          .where({
            movieid:that.data.movie[0]._id
          }).limit(5)
          .get({
            success(res){
              //console.log(res)
              that.setData({
                remarklist:res.data
              })
              //console.log(that.data.remarklist)
            },
            fail(err){
              console.log(err)
            }
          })



        },
        fail(err) {
          console.log(err)
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
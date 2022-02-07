// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:[
      {
        image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
        title:'失控玩家111111111111111111111111111111111111111111111111111111',
        rate:7.8
      },
      {
        image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
        title:'失控玩家',
        rate:7.8
      },
      {
        image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
        title:'失控玩家',
        rate:7.8
      }
    ],
    wantlist:[],
    watchedlist:[],


    loading:true,
    buttontext:'我想看的电影',

  },

  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },



  changeContent(){
    let that=this
    if(this.data.buttontext=='我想看的电影'){
      wx.setNavigationBarTitle({
        title: '我想看的电影',
      })
      that.setData({
        buttontext:'我看过的电影',
        list:that.data.wantlist
      })
    }else if(this.data.buttontext=='我看过的电影'){
      wx.setNavigationBarTitle({
        title: '我看过的电影',
      })
      that.setData({
        buttontext:'我想看的电影',
        list:that.data.watchedlist
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()

    let app=getApp()
    let that=this
    

    wx.setNavigationBarTitle({
      title: '我看过的电影',
    })

    wx.cloud.callFunction({
      name:'movieww',
      data:{
        type:'select',
        //openid:'o4Sem4kY3GMI99cZws6DkJ6TIx0Q',
        openid:app.globalData.userOpenID,
        option:'watched'
      },
      success(res){
        that.setData({
          watchedlist:res.result.data
        })

        wx.cloud.callFunction({
          name:'movieww',
          data:{
            type:'select',
            //openid:'o4Sem4kY3GMI99cZws6DkJ6TIx0Q',
            openid:app.globalData.userOpenID,
            option:'want'
          },
          success(res){
            //console.log(res)
            that.setData({
              wantlist:res.result.data
            })
            that.setData({
              list:that.data.watchedlist,
              loading:false
            })
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
    wx.cloud.init()

    let app=getApp()
    let that=this

    wx.setNavigationBarTitle({
      title: '我看过的电影',
    })
    that.setData({
      buttontext:'我想看的电影',
      loading:true
    })



    wx.cloud.callFunction({
      name:'movieww',
      data:{
        type:'select',
        //openid:'o4Sem4kY3GMI99cZws6DkJ6TIx0Q',
        openid:app.globalData.userOpenID,
        option:'watched'
      },
      success(res){
        that.setData({
          watchedlist:res.result.data
        })

        wx.cloud.callFunction({
          name:'movieww',
          data:{
            type:'select',
            //openid:'o4Sem4kY3GMI99cZws6DkJ6TIx0Q',
            openid:app.globalData.userOpenID,
            option:'want'
          },
          success(res){
            //console.log(res)
            that.setData({
              wantlist:res.result.data
            })
            that.setData({
              list:that.data.watchedlist,
              loading:false
            })
            wx.stopPullDownRefresh({
              success: (res) => {
                that.setData({
                  loading:false
                })
              },
              fail: (res) => {},
              complete: (res) => {},
            })
          }
        })
      }
    })
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
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    msg:"登录查看",
    nickname:'',
    avatarUrl:'',
    count_collection:'0',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },


  /**
   * 退出登录按钮功能,点击后退出登录状态
   */
  out(){
    let app=getApp()
    let that=this
    this.setData({
      msg:"登录查看",
      nickname:'',
      avatarUrl:'',
      count_collection:'0'
    })
    app.globalData.userOpenID=''
    app.globalData.userInfo=''
    console.log(app.globalData.userOpenID)
  },


  /**
   * 跳转到小组信息页面
   */
  toOur(){
    wx.navigateTo({
      url: '/pageA/pages/our/our',
    })
  },


  toCollection(){
    let app=getApp()
    if(app.globalData.userOpenID!=''){
      wx.navigateTo({
        url: '/pageA/pages/collection/collection',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        image:'/img/failure.png'
      })
    }
  },


  /**
   * 申请用户授权并获取用户信息
   */
  getinfo(ev){
    let app=getApp()
    let that=this
    //console.log(userinfo)

    wx.getUserProfile({
      desc: '用于登录账号', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取用户信息成功", res)
        app.globalData.userInfo=res.userInfo
        that.setData({
          nickname:res.userInfo.nickName,
          avatarUrl:res.userInfo.avatarUrl,
          msg:"全部"
        })
        wx.cloud.init()
        wx.cloud.callFunction({
          name:'login',
          success(res){
            app.globalData.userOpenID=res.result.openid
            wx.cloud.callFunction({
              name:"movieww",
              data:{
                type:'select',
                openid:app.globalData.userOpenID,
                option:"watched"
              },
              success(res){
                //console.log(res)
                let l=res.result.data.length
                that.setData({
                  count_collection:l.toString(),
                })
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
      },
      fail: res => {
        console.log("获取用户信息失败", res)
      }
    })

    

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 下拉刷新，刷新用户收藏电影的数据
   */
  onPullDownRefresh: function () {
    let app=getApp()
    let that=this

    //console.log("开始刷新")
    wx.cloud.init()
    wx.cloud.callFunction({
      name:"movieww",
      data:{
        type:'select',
        openid:app.globalData.userOpenID,
        option:"watched"
      },
      success(res){
        //console.log(res)
        let l=res.result.data.length
        that.setData({
          count_collection:l.toString()
        })
      },
      fail(err){
        console.log(err)
      }
    })
    wx.stopPullDownRefresh() //停止下拉刷新
    //console.log("刷新结束")

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
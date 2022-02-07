// pageA/pages/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:[
      {starURL:'/img/star1.png',rate:'1'},
      {starURL:'/img/star1.png',rate:'2'},
      {starURL:'/img/star1.png',rate:'3'},
      {starURL:'/img/star1.png',rate:'4'},
      {starURL:'/img/star1.png',rate:'5'},
    ],

    movieid:'',

    ownrate:'0'
  },


  radioChange(ev){
    //console.log(ev)
    let that=this
    let rate=ev.detail.value
    for(var i=0;i<5;i++){
      var url='stars['+i+'].starURL'
      that.setData({
        [url]:'/img/star1.png'
      })
    }
    for(var i=0;i<rate;i++){
      var url='stars['+i+'].starURL'
      that.setData({
        [url]:'/img/star3.png',
        ownrate:rate
      })
    }
  },


  sendRemark(ev){
    //console.log(ev)
    let remark=ev.detail.value.remark_content

    if(this.data.ownrate=='0' || remark==''){
      wx.showToast({
        title: '请评分和评论',
        image:'/img/failure.png'
      })
    }else{
      let app = getApp()
      let that=this
      //let today=new Date().toLocaleDateString()
      let date= new Date();
      let today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()

      wx.cloud.init()

      //console.log('获取登录信息')
      //console.log(app.globalData.userInfo)

      wx.cloud.callFunction({
        name:'remark',
        data:{
          type:'add',
          movieid:that.data.movieid,//电影id
          openid:app.globalData.userOpenID,//评论人id
          nickname:app.globalData.userInfo.nickName,//评论者昵称
          avatarUrl:app.globalData.userInfo.avatarUrl,//评论者头像
          rate:that.data.ownrate,//个人评分
          data:today,//评论日期
          remark:remark,//评论内容
        },
        success(){
          wx.showToast({
            title: '评论发布成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieid=parseInt(options.movieid)

    this.setData({
      movieid:movieid
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
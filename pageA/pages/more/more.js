// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[
      {
        image:'/img/default.png',
        title:'影片名称啊啊啊啊啊啊啊啊啊啊啊啊',
        rate:'8.5'
      }
    ],

    loading:true
  },
  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
    let type=options.type;
    let db=wx.cloud.database();
    let that=this;

    wx.setNavigationBarTitle({
      title: type+'电影',
    })

    db.collection('doubanmovie')
    .where({
      genre:db.RegExp({
        regexp:type,
        options:'i'
      })
    })
    .get({
      success(res){
        that.setData({
          movies:res.data,
          loading:false
        })
        //console.log(that.data.movies)
      },
      fail(err){
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
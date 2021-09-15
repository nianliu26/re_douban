// pages/research/research.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:[
    //   {
    //     image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
    //     title:'失控玩家111111111111111111111111111111111111111111111111111111',
    //     rate:7.8
    //   },
    //   {
    //     image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
    //     title:'失控玩家',
    //     rate:7.8
    //   },
    //   {
    //     image:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp',
    //     title:'失控玩家',
    //     rate:7.8
    //   }
    // ]
    list:[],
    loading:false

  },
  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },

  findData(info){
    let con = info.detail.value;
    let that=this;

    wx.cloud.init({
      traceUser: true,
    });
    let db=wx.cloud.database();
    let cmd = db.command;
    let col=db.collection('doubanmovie');
    col.where(cmd.or([
      {
        genre:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        title:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        actor:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        author:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        contries:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        director:db.RegExp({
          regexp:con,
          options:'i'
        })
      },
      {
        language:db.RegExp({
          regexp:con,
          options:'i'
        })
      }
    ])

    ).orderBy('rate','desc')
    .get({
      success(res){
        that.setData({
          list:res.data,
        })
        
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
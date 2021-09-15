// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    movie_list:[
      {
        list_title:'动作',
        list_content:[],
      },
      {
        list_title:'剧情',
        list_content:[],
      },
      {
        list_title:'喜剧',
        list_content:[],
      }
    ],

    loading:true,

  },
  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },
  toMore(ev){
    let type=ev.target.dataset.type;

    wx.navigateTo({
      url: "/pageA/pages/more/more?type="+type,
    })
  },
  toReaserch(){
    wx.navigateTo({
      url: "/pageA/pages/research/research",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
    let db = wx.cloud.database();
    let that = this;
    let cmd = db.command;
    let col = db.collection('doubanmovie');

    for(let x=0;x<3;x++){
      col.where({
        genre:db.RegExp({
          regexp:that.data.movie_list[x].list_title,
          options:'i'
        })
      }).orderBy('rate','desc')
      .limit(8)
      .skip(8)
      .get({
        success(res){
          let str="movie_list["+x+"].list_content"
          that.setData({
            [str]:res.data,
            loading:false
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }
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
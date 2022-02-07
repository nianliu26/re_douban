// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //电影分类数据
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

    loading:true,//是否处于加载中状态

  },

  /**
   * 跳转到电影详情页面
   * @param {*} ev 
   */
  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },

  /**
   * 跳转到查看更多页面
   * @param {*} ev 
   */
  toMore(ev){
    let type=ev.target.dataset.type;

    wx.navigateTo({
      url: "/pageA/pages/more/more?type="+type,
    })
  },


  /**
   * 跳转到搜索页面
   */
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

    //获取三个分类的电影列表,每个分类8条数据并保存到movielist中
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
            loading:false//获取成功之后关闭加载动画
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
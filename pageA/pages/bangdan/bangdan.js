// pages/bangdan/bangdan.js
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

    displaystyle:false,
    loading:true,

  },



  switchChange(ev){
    //console.log(ev)
    this.setData({
      displaystyle:ev.detail.value
    })
  },

  toDetails(ev){
    let id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pageA/pages/details/details?id="+id
    })
  },





  /**
   * 传过来的是榜单名
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    });
    let name=options.name
    let db=wx.cloud.database()
    let that=this

    if(name=='2020'){
      wx.setNavigationBarTitle({
        title: '2020豆瓣年度榜单',
      })
      db.collection('doubanmovie')
      .where({
        year:'(2020)'
      })
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })

    }else if(name=='2019'){
      wx.setNavigationBarTitle({
        title: '2019豆瓣年度榜单',
      })
      db.collection('doubanmovie')
      .where({
        year:'(2019)'
      })
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })

    }else if(name=='冠军'){

      wx.setNavigationBarTitle({
        title: '冠军榜单',
      })
      db.collection('doubanmovie')
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })

    }else if(name=='华语'){
      wx.setNavigationBarTitle({
        title: '华语口碑剧集',
      })

      db.collection('doubanmovie')
      .where({
        contries:db.RegExp({
          regexp:'中国',
          options:'i'
        })
      })
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })

    }else if(name=='全美'){
      wx.setNavigationBarTitle({
        title: '全美口碑剧集',
      })

      db.collection('doubanmovie')
      .where({
          contries: '美国',
      })
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })

    }else if(name=='英国'){

      wx.setNavigationBarTitle({
        title: '英国口碑剧集',
      })
      db.collection('doubanmovie')
      .where({
          contries: '英国',
      })
      .orderBy('rate', 'desc')
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            list: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
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
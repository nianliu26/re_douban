// pages/top/top.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bang20:[],
    bang19:[],
    winner:[],
    top_china:[],
    top_usa: [],
    top_b:[],

    loading:true,
  },



  toBangdan(ev){
    //console.log(ev)
    let name=ev.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pageA/pages/bangdan/bangdan?name='+name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    });
    let db = wx.cloud.database()
    //将全局this的值赋值给that
    let that = this;
    // 2020榜单
    db.collection('doubanmovie')
      .where({
        year:'(2020)'
      })
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            bang20: res.data
          })
        },
        fail(err) {
          console.log(err);
        }
      })

// 2019年榜单
    db.collection('doubanmovie')
      .where({
        year:'(2019)'
      })
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            bang19: res.data
          })
        },
        fail(err) {
          console.log(err);
        }
      })

// 总榜
    db.collection('doubanmovie')
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            winner: res.data
          })
        },
        fail(err) {
          console.log(err);
        }
      })

// 中国榜单
    db.collection('doubanmovie')
      .where({
        contries:db.RegExp({
          regexp:'中国',
          options:'i'
        })
      })
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            top_china: res.data
          })
        },
        fail(err) {
          console.log(err);
        }
      })
// 美国榜单
    db.collection('doubanmovie')
      .where({
          contries: '美国',
      })
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            top_usa: res.data
          })
        },
        fail(err) {
          console.log(err);
        }
      })

// 英国榜单
    db.collection('doubanmovie')
      .where({
          contries: '英国',
      })
      .orderBy('rate', 'desc')
      .limit(3)
      .get({
        success(res) {
          //console.log(res.data);
          that.setData({
            top_b: res.data,
            loading:false
          })
        },
        fail(err) {
          console.log(err);
        }
      })
  },
  onReady:function(){
    // 设置导航栏的文字
    wx.setNavigationBarTitle({
      title: '榜单',
    })
    // 设置导航栏的颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  }
  
})

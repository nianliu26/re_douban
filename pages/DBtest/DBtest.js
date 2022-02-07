// pages/DBtest/DBtest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie_list:[
      {
        list_title:'动作',
        list:[],
      },
      {
        list_title:'剧情',
        list:[],
      },
      {
        list_title:'喜剧',
        list:[],
      }
    ],

    picture:"../../img/loading.png",
    information:"加载中...",
    display:true,

    str:"a,b,c,d",


    //模拟用户数据
    nickname:'微信用户',
    openid:'1111',
    avatarUrl:'https://cdn.pixabay.com/photo/2020/07/21/16/24/landscape-5426755_960_720.jpg',

    //模拟电影数据
    movieid:'111',

    remark_acount:'500',

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
      },
      {
        _id:'123',
        nickname:'昵称',
        avatarUrl:'/img/default.png',
        rate:'5',
        data:'8月9日',
        remark:'今天是个好日子呀埃里克解放路卡等级分类看见了看见的弗兰克极乐空间联发科解放路科技看到几个老师开房间隔离开关了女老师发个链接akjfdlkdjfldjlkdjfkladjflakdjfldkjflncladglhlclnlla',
        goods:'2000'
      },
      {
        _id:'123',
        nickname:'昵称',
        avatarUrl:'/img/default.png',
        rate:'5',
        data:'8月9日',
        remark:'今天是个好日子呀埃里克解放路卡等级分类看见了看见的弗兰克极乐空间联发科解放路科技看到几个老师开房间隔离开关了女老师发个链接akjfdlkdjfldjlkdjfkladjflakdjfldkjflncladglhlclnlla',
        goods:'2000'
      }
    ],



    //评星数据
    stars:[
      {starURL:'/img/star1.png',rate:'1'},
      {starURL:'/img/star1.png',rate:'2'},
      {starURL:'/img/star1.png',rate:'3'},
      {starURL:'/img/star1.png',rate:'4'},
      {starURL:'/img/star1.png',rate:'5'},
    ],

    ownrate:'1'


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


  // sendRemark(ev){
  //   console.log(ev)
  //   let remark=ev.detail.value.remark_content
  //   let app = getApp()
  //   let that=this
  //   let today=new Date().toLocaleDateString

  //   wx.cloud.init()

  //   wx.cloud.callFunction({
  //     name:'remark',
  //     data:{
  //       type:'add',
  //       movieid:that.data.movieid,//电影id
  //       openid:that.data.openid,//评论人id
  //       nickname:that.data.nickname,//评论者昵称
  //       avatarUrl:that.data.avatarUrl,//评论者头像
  //       rate:that.data.rate,//个人评分
  //       data:today,//评论日期
  //       remark:remark,//评论内容
  //     },
  //     success(){
  //       wx.showToast({
  //         title: '评论发布成功',
  //       })
  //     }
  //   })



  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that=this

    //评论逻辑：
    //wx.cloud.init()


    // //添加一条评论
    // let today=new Date()
    // wx.cloud.callFunction({
    //   name:'remark',
    //   data:{
    //     type:'add',
    //     movieid:"111",//电影id
    //     openid:that.data.openid,//评论人id
    //     nickname:that.data.nickname,//评论者昵称
    //     avatarUrl:that.data.avatarUrl,//评论者头像
    //     rate:'3',//个人评分
    //     data:today.toLocaleDateString(),//评论日期
    //     remark:'这是第1条测试评论',//评论内容
    //   }
    // })




    // //获取评论数量
    // wx.cloud.callFunction({
    //   name:'remark',
    //   data:{
    //     type:'remarkacount',
    //     movieid:'111'
    //   },
    //   success(res){
    //     //console.log(res)
    //     that.setData({
    //       remark_acount:res.result
    //     })
    //     //console.log(that.data.remark_acount)
    //   }
    // })

    // //获取5条评论数据，用于详情页面显示
    // let db=wx.cloud.database()
    // db.collection('remark')
    // .where({
    //   movieid:that.data.movieid
    // }).limit(5)
    // .get({
    //   success(res){
    //     console.log(res)
    //     that.setData({
    //       remarklist:res.data
    //     })
    //     console.log(that.data.remarklist)
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })





    // wx.cloud.init()

    //   wx.cloud.callFunction({
    //     name:'login',
    //     success(res){
    //       console.log(res.result.openid)
    //     },
    //     fail(err){
    //       console.log(err)
    //     }
    //   })
    



    
    // //云函数初始化
    // wx.cloud.init({
    //   traceUser: true,
    // })
    // //连接数据库
    // const db=wx.cloud.database()
    // let that=this
    // //获取集合对象
    // const collect=db.collection('doubanmovie')
    // //通过集合对象获取数据
    // collect.get({
    //   success(res){
    //     console.log('数据获取成功')
    //     //将获取到的数据放到data的movie中
    //     that.setData({
    //       movies:res.data
    //     })
    //     console.log(that.data.movies)
    //   },
    //   fail(err){
    //     console.log(err);
    //   }
    // })

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
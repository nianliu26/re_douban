// Component/remark/remark.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes:{
    created(){
      //获取评论数量
      wx.cloud.callFunction({
        name:'remark',
        data:{
          type:'remarkacount',
          movieid:'111'
        },
        success(res){
          //console.log(res)
          that.setData({
            remark_acount:res.result
          })
          //console.log(that.data.remark_acount)
        }
      })

      //获取5条评论数据，用于详情页面显示
      let db=wx.cloud.database()
      db.collection('remark')
      .where({
        movieid:that.data.movieid
      }).limit(5)
      .get({
        success(res){
          console.log(res)
          that.setData({
            remarklist:res.data
          })
          console.log(that.data.remarklist)
        },
        fail(err){
          console.log(err)
        }
      })
    }
  }
})

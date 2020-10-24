//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    bgColor:['#E43124','#F34646','#3C81FF','#028379','#4091FF'],
    navDatas:[{
      title:'首页'
    },{
      title:'家用电器'
    },{
      title:'男装女装'
    },{
      title:'鞋靴箱包'
    },{
      title:'手机数码'
    },{
      title:'电脑办公'
    },{
      title:'家居家纺'
    },{
      title:'个人化妆'
    }],
    imgDatas:[{
      id:1,
      imgSrc:'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978394783.jpg'
    },{
      id:2,
      imgSrc:'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978396430.jpg'
    },{
      id:3,
      imgSrc:'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978397105.jpg'
    },{
      id:4,
      imgSrc:'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978395260.jpg'
    },{
      id:5,
      imgSrc:'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978395241.jpg'
    }],
    homeIndex:0, //首页-首页轮播图索引
    swiperIndex:0, //nav索引
    oLeft:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  homeIndexFn(e){
    // console.log(e.detail.current);
    this.setData({
      homeIndex:e.detail.current
    })
  },

  fn(){
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../template/template'
    })
  },
  navFn(e){
    this.setData({
      swiperIndex:e.currentTarget.dataset.current
    })
  },

  swiperChangeFn(e){
    // console.log(e);
    this.setData({
      swiperIndex:e.detail.current
    })
    if(e.detail.current>=1 && e.detail.current<=6){
      this.setData({
        oLeft:(e.detail.current-2)*90
      })
    }
  },


  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgColor: ['#E43124', '#F34646', '#3C81FF', '#028379', '#4091FF'],
    cat_id: ['', '858', '6', '8', '3', '4', '5', '860'],
    navDatas: [{
      title: '首页'
    }, {
      cat_id: 858,
      title: '家用电器'
    }, {
      cat_id: 6,
      title: '男装女装'
    }, {
      cat_id: 8,
      title: '鞋靴箱包'
    }, {
      cat_id: 3,
      title: '手机数码'
    }, {
      cat_id: 4,
      title: '电脑办公'
    }, {
      cat_id: 5,
      title: '家居家纺'
    }, {
      cat_id: 860,
      title: '个人化妆'
    }],
    imgDatas: [{
      id: 1,
      imgSrc: 'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978394783.jpg'
    }, {
      id: 2,
      imgSrc: 'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978396430.jpg'
    }, {
      id: 3,
      imgSrc: 'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978397105.jpg'
    }, {
      id: 4,
      imgSrc: 'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978395260.jpg'
    }, {
      id: 5,
      imgSrc: 'https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978395241.jpg'
    }],
    homeIndex: 0, //首页-首页轮播图索引
    swiperIndex: 0, //nav索引
    oLeft: 0,
    opacity:1,
    mainHeight: 0,
    goodsList:[],//首页-首页列表数据
    kitchenData: [],//厨房电器数据
    productDatas: [],//家用电器页面的品牌精选数据
    page: 1,
    swiperSlideLists:[],//首页潮流服饰数据
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  homeIndexFn(e) {
    // console.log(e.detail.current);
    this.setData({
      homeIndex: e.detail.current
    })
  },
  //点击首页头部信息按钮跳转
  fn() {
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../template/template'
    })
  },
  //点击首页头部导航栏更换下面内容
  navFn(e) {
    // https://x.dscmall.cn/api/visual/visual_second_category?cat_id=858
    // https://x.dscmall.cn/api/catalog/goodslist
    //改变nav中的索引使其移动
    this.setData({
      swiperIndex: e.currentTarget.dataset.current
    })
    this.getHomeDatas();
    this.postListDatas();
  },
  // 滑动首页内容区域同步到nav头部
  swiperChangeFn(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
    if (e.detail.current >= 1 && e.detail.current <= 6) {
      this.setData({
        oLeft: (e.detail.current - 2) * 86
      })
    }
    this.getHomeDatas();
    this.postListDatas();
  },
  //首页-首页
  scrollIndexFn(){
    var page=++this.data.page;
    
    wx.showLoading({
      title: '数据加载中...',
    })
    // https://x.dscmall.cn/api/goods/type_list?page=1&size=10&type=is_best
    wx.request({
      url: 'https://x.dscmall.cn/api/goods/type_list',
      data:{
        page:page,
        size:10,
        type:'is_best'
      },
      success:(res)=>{
        // console.log(res);
        if(res.statusCode==200){
          if(res.data.data.length==0){
            wx.showToast({
              title: '没有更多商品了！',
            })
          }else{
            wx.hideLoading();
            this.setData({
              goodsList:this.data.goodsList.concat(res.data.data)
            })
          }
        }
      }
    })
  },
   //首页-家用电器
  scrollEleFn() {
    this.getListDatas();
  },
    //首页-男装女装
  scrollMakeFn() {
    this.getListDatas();
  },
    //首页-鞋靴箱包
  scrollBootFn(){
    this.getListDatas();
  },
    //首页-手机数码
  scrollPhoneFn(){
    this.getListDatas();
  },
    //首页-电脑办公
  scrollComputerFn(){
    this.getListDatas();
  },
    //首页-家居家纺
  scrollHouseholdFn(){
    this.getListDatas();
  },
    //首页-个人化妆
  scrollPersonalFn(){
    this.getListDatas();
  },
// get请求首页数据
getHomeDatas(){
    var cat_id = this.data.cat_id[this.data.swiperIndex];
    wx.request({
      url: `https://x.dscmall.cn/api/visual/visual_second_category`,
      data:{
        cat_id:cat_id,
      },
      success: (res) => {
        this.setData({
          kitchenData: res.data
        })
      }
    })
},
// 初始化数据
postListDatas(){
  wx.showLoading({
    title: '正在加载中...',
  })
  var cat_id = this.data.cat_id[this.data.swiperIndex];
  var productDatas = this.data.productDatas;
  wx.request({
    url: `https://x.dscmall.cn/api/catalog/goodslist`,
    method: "POST",
    data: {
      cat_id: cat_id,
      page:1,
      size: 10,
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: (res) => {
      if (res.statusCode == 200) {
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '没有更多数据了',
          })
        } else {
          wx.hideLoading();
          this.setData({
            productDatas: res.data.data
          })
        }
      }
    },
    fail: (resle) => {
      console.log(resle);
    }
  })
},
//post请求首页数据
  getListDatas() {
    wx.showLoading({
      title: '正在加载中...',
    })
    var cat_id = this.data.cat_id[this.data.swiperIndex];
    var productDatas = this.data.productDatas;
    var page = ++this.data.page;
    wx.request({
      url: `https://x.dscmall.cn/api/catalog/goodslist`,
      method: "POST",
      data: {
        cat_id: cat_id,
        page:page,
        size: 10,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '没有更多数据了',
            })
          } else {
            wx.hideLoading();
            this.setData({
              productDatas: productDatas.concat(res.data.data)
            })
          }
        }
      },
      fail: (resle) => {
        console.log(resle);
      }
    })
  },

  //顶部动画
  scrollTopFn(e){
    // console.log(e.detail.scrollTop);
    var scrollTop=e.detail.scrollTop;
    if(scrollTop>50){
      this.setData({
        opacity:0
      })
    }else{
      this.setData({
        opacity:1
      })
    }
  },

  onLoad: function (options) {
    //首页列表数据
    wx.showLoading({
      title: '数据加载中...',
    })
    // https://x.dscmall.cn/api/goods/type_list?page=1&size=10&type=is_best
    wx.request({
      url: 'https://x.dscmall.cn/api/goods/type_list',
      data:{
        page:1,
        size:10,
        type:'is_best'
      },
      success:(res)=>{
        // console.log(res.data);
        if(res.statusCode==200){
          wx.hideLoading();
          this.setData({
            goodsList:res.data.data
          })
        }
      }
    })

    wx.request({
      url: 'https://x.dscmall.cn/api/visual/view',
      method:'post',
      header:"content-type:application/x-www-form-urlencoded",
      data:{
        id: 3,
        type: 'index',
        device: 'h5'
      },
      success:(res)=>{
        
        var datas=JSON.parse(res.data.data.data)
        var arr=[];
        var arrNum=10;
        for(var i=0;i<datas[3].data.list.length;i+=arrNum){
          arr.push(datas[3].data.list.slice(i,i+arrNum));
        }
        // console.log(arr);
        this.data.swiperSlideLists.push(arr);
        this.setData({
          swiperSlideLists:this.data.swiperSlideLists[0]
        })
      }
    })

    wx.getSystemInfo({
      success: (result) => {
        // console.log(result);
        this.setData({
          mainHeight: result.windowHeight
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

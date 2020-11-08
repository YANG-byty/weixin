let {
  requestApi
} = require('../../utils/request');
let app = getApp();
let wxParse = require('../../wxParse/wxParse');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: ['商品', '详情', '推荐', '评论'],
    headerIndex: 0,
    detailDatas: {},
    strDatas: '',
    flag: true,
    page: 1,
    goodsList: [],
    windowHeight: 0,
    listflag: true,
    topArr: [],
    heightArr: [],
    mask: false,
    animationObj: '',
    num: 1,
    gid: 0,
    buyNum: 0,
  },

  // 减减   加加
  changeNumFn(e) {
    var cartDatas = wx.getStorageSync('cartData') || [];
    if (e.currentTarget.dataset.num == 0) {
      if (this.data.num <= 1) {
        this.setData({
          num: 1
        })
        wx.showToast({
          title: '至少要买一件呦！',
          icon: 'error',
        })
      } else {
        this.setData({
          num: this.data.num - 1
        })
      }
    } else {
      this.setData({
        num: Number(this.data.num) + 1
      })
    }
    // console.log(this.data.gid);
    for (var i = 0; i < cartDatas.length; i++) {
      if (cartDatas[i].goods_id == this.data.gid) {
        // console.log(cartDatas[i]);
        cartDatas[i].num = this.data.num;
      }
    }
    wx.setStorageSync('cartData', cartDatas);
    this.buyNumFn();
  },

  toDetailFn() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  // 加入购物车
  addCartFn() {
    var cartData = this.data.detailDatas;
    cartData.isSelect = true;
    cartData.num = this.data.num;
    var gid = this.data.gid;
    var cartDatas = wx.getStorageSync('cartData') || [];
    // console.log(cartDatas);

    if (cartDatas.length > 0) {
      for (var i = 0; i < cartDatas.length; i++) {
        if (cartDatas[i].goods_id == gid) {
          console.log(gid);
          cartDatas[i].num = cartDatas[i].num + 1;
          try {
            wx.setStorageSync('cartData', cartDatas);
            wx.showToast({
              title: '添加成功！',
              icon: 'success',
              duration: 2000
            })
          } catch (err) {
            wx.showToast({
              title: '添加失败！',
              icon: 'error',
            })
          }
          return;
        }
      }
      cartDatas.unshift(cartData);
    } else {
      cartDatas.unshift(cartData);
      console.log(cartDatas);
      wx.showToast({
        title: '添加成功！',
        icon: 'success',
        duration: 2000
      })
    }
    wx.setStorageSync('cartData', cartDatas);
    this.hiddenMaskFn();
    this.buyNumFn();
  },

  animationFn() {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    animation.translateY(260).step();
    setTimeout(() => {
      animation.translateY(0).step();
      this.setData({
        animationObj: animation.export(), //导出动画
        mask: true
      })
    }, 200);
    this.setData({
      animationObj: animation.export(),
      mask: true
    })
  },
  // 点击已选动画
  showMaskFn() {
    this.animationFn();
  },
  hiddenMaskFn() {
    this.setData({
      mask: false
    })
  },

  // 详情页头部导航切换
  activeChange(e) {
    this.setData({
      headerIndex: e.target.dataset.index
    })
  },
  // 商品详情
  particularsFn() {
    this.setData({
      flag: true
    })
  },

  // 规格参数
  parameterFn() {
    this.setData({
      flag: false
    })
  },
  // 封装一个获取top  height的函数
  infoScrollFn() {
    var topArr = [];
    var heightArr = [];
    for (var i = 0; i < 3; i++) {
      const query = wx.createSelectorQuery();
      query.select('#detail' + i).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        // #the-id节点的上边界坐标
        // 显示区域的竖直滚动位置
        console.log(res[0]);
        topArr.push(res[0].top);
        heightArr.push(res[0].height);
      })
    }
    this.setData({
      topArr: topArr,
      heightArr: heightArr
    })
  },

  scrollContentFn(e) {
    // this.infoScrollFn();
    var scrollTop = e.detail.scrollTop;
    // console.log(scrollTop);
    var detailHeader = 0;
    // 获取头部nav的高度
    const query = wx.createSelectorQuery();
    query.select('#detail-header').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      // #the-id节点的上边界坐标
      // 显示区域的竖直滚动位置
      detailHeader = res[0].height;
      // console.log(detailHeader);
    })
    // console.log(this.data.topArr);

    for (var i = 0; i < this.data.topArr.length; i++) {
      // console.log(this.data.topArr[i] - detailHeader + this.data.heightArr[i]);
      if (scrollTop > this.data.topArr[i] && scrollTop < this.data.topArr[i] - detailHeader + this.data.heightArr[i]) {
        this.setData({
          headerIndex: i
        })
      }
    }
  },


  async detailFn(url, data, method) {
    let detailDatas = await requestApi(url, data, method);
    console.log(detailDatas);
    var str = detailDatas.data.data.goods_desc;
    this.setData({
      detailDatas: detailDatas.data.data,
      strDatas: str
    })
    wxParse.wxParse('article', 'html', this.data.strDatas, this);
  },

  // https://x.dscmall.cn/api/goods/goodsguess
  async scrollFn(page) {
    wx.showLoading({
      title: '加载中...',
    })
    var url = 'https://x.dscmall.cn/api/goods/goodsguess';
    let result = await requestApi(url, {
      page: page,
      size: 10
    }, 'post');
    // console.log(result);
    if (result.statusCode == 200) {
      wx.hideLoading()
    }
    if (result.data.data == '') {
      this.setData({
        listflag: false
      })
    }
    if (page == 1) {
      this.setData({
        goodsList: result.data.data
      })
    } else {
      this.setData({
        goodsList: this.data.goodsList.concat(result.data.data)
      })
    }
  },

  // 详情页列表数据
  detailScrollFn() {
    if (this.data.listflag) {
      var page = ++this.data.page;
      this.scrollFn(page);
    }
  },
  buyNumFn() {
    var cartData = wx.getStorageSync('cartData');
    var buyNum = 0;
    for (var i = 0; i < cartData.length; i++) {
      if (cartData[i].isSelect) {
        buyNum += cartData[i].num;
      }
    }
    this.setData({
      buyNum: buyNum
    })
  },


  onLoad: function (options) {
    this.buyNumFn();
    console.log(options);
    console.log(options.num);
    if (options.num) {
      this.setData({
        num: options.num
      })
    }
    this.setData({
      windowHeight: app.globalData.windowHeight,
      gid: options.goods_id,

    })
    // console.log(options);
    // https://x.dscmall.cn/api/goods/show
    var url = 'https://x.dscmall.cn/api/goods/show';
    this.detailFn(url, {
      goods_id: options.goods_id
    }, 'post');

    this.scrollFn(this.data.page);
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      this.infoScrollFn();
      wx.hideLoading()
    }, 5000)

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
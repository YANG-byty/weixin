// pages/faxian/faxian.js
var {
  requestApi
} = require('../../utils/request');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterindex: 0,
    filter: ['综合', '新品', '销量', '价格', '筛选'],
    category: true,
    productDatas: [],
    sort: ['goods_id', 'last_update', 'sales_volume', 'shop_price'],
    order: ['desc', 'asc'],
    cat_id: 0,
    windowHeight: 0,
    page: 1,
    flag: false,
    num: 0,
    scrollFlag: true,
  },

  async goodsDatas(cat_id, sort, order, page, max, min) {
    wx.showLoading({
      title: '加载中...',
    })
    let result = await requestApi('https://x.dscmall.cn/api/catalog/goodslist', {
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      goods_num: 0,
      size: 10,
      page: page,
      sort: sort,
      order: order,
      self: 0,
    }, 'post')
    if (this.data.flag) {
      this.setData({
        productDatas: this.data.productDatas.concat(result.data.data),
        scrollFlag: false
      }, () => {
        wx.hideLoading()
      })
    } else {
      this.setData({
        productDatas: result.data.data
      }, () => {
        wx.hideLoading();
        this.setData({
          scrollFlag: true
        })
      })
    }
    console.log(this.data.page);

    console.log(result.data.data);

  },

  // 点击头部赛选
  filterFn(e) {
    if (e.target.dataset.filterindex == 3) {
      if (this.data.num == 0) {
        this.setData({
          num: 1,
        })
      } else {
        this.setData({
          num: 0,
        })
      }
    }
    this.setData({
      filterindex: e.target.dataset.filterindex,
      flag: false
    })
    var sort = this.data.sort[e.target.dataset.filterindex];
    var order = this.data.order[this.data.num]
    this.goodsDatas(this.data.cat_id, sort, order);
  },

  // 滚动到底部
  scrollTolowerFn() {
    if (this.data.scrollFlag) {
      this.setData({
        page: ++this.data.page,
        flag: true
      })
      var page = this.data.page;
      var sort = this.data.sort[this.datafilterindex];
      var order = this.data.order[this.data.num]
      this.goodsDatas(this.data.cat_id, sort, order, page);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      windowHeight: app.globalData.windowHeight
    })
    this.setData({
      cat_id: option.cat_id
    })
    this.goodsDatas(option.cat_id, this.data.sort[0]);
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
// pages/faxian/faxian.js
var { requestApi } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // flag: true,
    filterindex: 0,
    filter: ['综合', '新品', '销量', '价格', '筛选'],
    category: true,
    productDatas: [],
    sort: ['goods_id', 'last_update', 'sales_volume', 'shop_price'],
    order: ['desc', 'asc'],
    cat_id:0,
  },

  async goodsDatas(cat_id, sort, max, min) {
    let result = await requestApi('https://x.dscmall.cn/api/catalog/goodslist', {
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      goods_num: 0,
      size: 10,
      page: 1,
      sort: sort,
      order: 'desc',
      self: 0,
    }, 'post')
    console.log(result);
    this.setData({
      productDatas: result.data.data
    })
  },
  filterFn(e) {

    // console.log(e.target.dataset.filterindex);
    // if (this.data.filter[e.target.dataset.filterindex] == '综合') {
    //   this.setData({
    //     flag: !flag
    //   })
    // }
    this.setData({
      filterindex: e.target.dataset.filterindex
    })
    var sort = this.data.sort[e.target.dataset.filterindex];
    this.goodsDatas(this.data.cat_id,sort,);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // console.log(option.cat_id);
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
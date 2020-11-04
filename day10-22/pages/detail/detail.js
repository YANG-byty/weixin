let { requestApi } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: ['商品', '详情', '推荐', '评论'],
    headerIndex: 0,
    detailDatas: {},
    strDatas: '',
    flag: true
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


  /**
   * 生命周期函数--监听页面加载
   */
  async detailFn(url, data, method) {
    let detailDatas = await requestApi(url, data, method);
    console.log(detailDatas);
    var str = detailDatas.data.data.goods_desc;
    // var aa = str.replace(new RegExp('div', 'mg'), 'view').replace(new RegExp('img', 'mg'), 'image');
    // var aa = str.replace(/div/mg, 'view');

    // console.log(str);
    this.setData({
      detailDatas: detailDatas.data.data,
      strDatas: str
    })


  },

  onLoad: function (options) {
    // console.log(options);
    // https://x.dscmall.cn/api/goods/show
    var url = 'https://x.dscmall.cn/api/goods/show';
    this.detailFn(url, {
      goods_id: options.goods_id
    }, 'post');
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
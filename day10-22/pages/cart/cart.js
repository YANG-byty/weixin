// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    totalPrice: 0,
    buyNum: 0,
    checkAlldate: true,
    nullFn: false,
  },

  // 加加
  addFn(e) {
    var cart = this.data.cart;
    var index = e.currentTarget.dataset.index;
    var cartData = cart[index].num;
    cart[index].num = cartData + 1;
    this.setData({
      cart: cart
    })
    this.totalPrice();
  },

  // 减减
  refuceFn(e) {
    var cart = this.data.cart;
    var index = e.currentTarget.dataset.index;
    var cartData = cart[index].num;
    if (cartData > 1) {
      cart[index].num = cartData - 1;
    }
    this.setData({
      cart: cart
    })
    this.totalPrice();
  },

  // 单个选中
  checkedFn(e) {
    var index = e.currentTarget.dataset.index;
    var cart = this.data.cart;
    cart[index].isSelect = !cart[index].isSelect;
    this.totalPrice();
    this.setData({
      cart: wx.getStorageSync('cartData')
    })
    this.checkAll();
  },

  // 全选按钮
  checkAllFn() {

    this.setData({
      cart: wx.getStorageSync('cartData')
    })
    this.setData({
      checkAlldate: !this.data.checkAlldate
    })
    var cart = this.data.cart;
    for (var i = 0; i < cart.length; i++) {
      cart[i].isSelect = this.data.checkAlldate;
    }
    this.setData({
      cart: cart
    })
    this.totalPrice();
  },

  checkAll() {
    this.setData({
      cart: wx.getStorageSync('cartData')
    })
    var cart = this.data.cart;
    var arr = [];
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].isSelect) {
        arr.push(cart[i].isSelect);
      }
    }
    if (arr.length == cart.length) {
      this.setData({
        checkAlldate: true
      })
    } else {
      this.setData({
        checkAlldate: false
      })
    }
  },

  // 计算总价
  totalPrice() {
    var cart = this.data.cart;
    wx.setStorageSync('cartData', cart)
    var totalPrice = 0;
    var buyNum = 0;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].isSelect) {
        totalPrice += cart[i].num * cart[i].shop_price
        buyNum += cart[i].num;
      }
    }
    this.setData({
      totalPrice: totalPrice,
      buyNum: buyNum
    })
  },


  toDetailFn(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + e.currentTarget.dataset.gid + "&num=" + e.currentTarget.dataset.num,
    })
  },

  //删除
  removeFn(e) {
    var index = e.currentTarget.dataset.index;
    var cart = this.data.cart;
    wx.showModal({
      title: '提示',
      content: '亲，您确定要放弃该商品吗？',
      success: (res) => {
        if (res.confirm) {
          cart.splice(index, 1);
          this.setData({
            cart: cart
          })
          this.totalPrice();
          if (wx.getStorageSync('cartData').length == 0) {
            this.setData({
              nullFn: false
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  toIndexFn() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cart: wx.getStorageSync('cartData')
    })
    this.totalPrice();
    this.checkAll();
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
    this.setData({
      cart: wx.getStorageSync('cartData')
    })
    if (wx.getStorageSync('cartData').length >= 1) {
      console.log(123);
      this.setData({
        nullFn: true
      })
    }
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
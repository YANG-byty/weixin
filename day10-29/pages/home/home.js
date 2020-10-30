// pages/home/home.js
var { requestApi } = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    goodsList: [],
    even: [],
    odd: [],
    page: 1,
    opacity: 0,
    color: "#fff"
  },


  // 滚动home内容部分触发
  homeScrollFn(e) {
    console.log(this.data.opacity);
    this.setData({
      opacity: e.detail.scrollTop / 60 * 0.6
    })
    if ((e.detail.scrollTop / 60 * 0.6) >= 1) {
      this.setData({
        color: "#000"
      })
    } else {
      this.setData({
        color: "#fff"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowHeight: result.windowHeight
        })
      },
    })
    wx.showLoading({
      title: "数据加载中...",
    })
    //首页列表数据
    // https://x.dscmall.cn/api/goods/type_list?page=1&size=10&type=is_best
    requestApi("https://x.dscmall.cn/api/goods/type_list", {
      page: 1,
      size: 10,
      type: 'is_best'
    }).then(res => {
      console.log(res);
      if (res.statusCode == 200) {
        wx.hideLoading();
        //瀑布流
        for (let i = 0; i < res.data.data.length; i++) {
          if ((i + 1) % 2 == 0) {
            this.data.even.push(res.data.data[i]);
          } else {
            this.data.odd.push(res.data.data[i]);
          }
        }
        this.data.goodsList.push(this.data.even);
        this.data.goodsList.push(this.data.odd);
        this.setData({
          goodsList: this.data.goodsList
        })
        console.log(this.data.goodsList);
      }
    });
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
  onPullDownRefresh: function (e) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    var page = ++this.data.page;
    wx.request({
      url: 'https://x.dscmall.cn/api/goods/type_list',
      data: {
        page: page,
        size: 10,
        type: 'is_best'
      },
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '没有更多商品了！',
            })
          } else {
            //瀑布流
            for (let i = 0; i < res.data.data.length; i++) {
              if ((i + 1) % 2 == 0) {
                this.data.goodsList[0].push(res.data.data[i]);
              } else {
                this.data.goodsList[1].push(res.data.data[i]);
              }
            }
            wx.hideLoading();
            this.setData({
              goodsList: this.data.goodsList
            })
            console.log(this.data.goodsList);
          }
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
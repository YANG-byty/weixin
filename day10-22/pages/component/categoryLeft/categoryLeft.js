var { requestApi } = require('../../../utils/request');


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
    categoryLeftDatas: [],
    leftIndex: 0,
    rightList: [],
    rightListDatas: [],
    touch_catads: '',
    LeftDatasLength: 0,
    scrollTop: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击商品
    toProductList(e) {
      // console.log(e.currentTarget.dataset);
      wx.navigateTo({
        url: "/pages/productList/productList?cat_id=" + e.currentTarget.dataset.cat_id,
      })
    },
    // 点击左边分类左边部分
    categoryLeFn(e) {

      wx.showLoading({
        title: '加载中...',
      })
      this.setData({
        leftIndex: e.currentTarget.dataset.index,
        touch_catads: this.data.categoryLeftDatas[e.currentTarget.dataset.index].touch_catads
      })

      var cat_id = e.currentTarget.dataset.cat_id;
      var url = 'https://x.dscmall.cn/api/catalog/list/' + cat_id;

      requestApi(url).then((res) => {
        if (res.statusCode == 200) {
          wx.hideLoading();
          this.setData({
            rightList: res.data.data,
            scrollTop: 2,
          })
        }
      });
      // console.log(this.data.scrollTop);

    },
    dragstartTop(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },
  },
  attached() {
    wx.showLoading({
      title: '加载中...',
    })
    // 左边部分
    var url = 'https://x.dscmall.cn/api/catalog/list';
    requestApi(url).then((res) => {
      this.setData({
        categoryLeftDatas: res.data.data,
        touch_catads: res.data.data[0].touch_catads,
        LeftDatasLength: res.data.data.length
      })
    });
    // 右边部分
    wx.request({
      url: 'https://x.dscmall.cn/api/catalog/list/858',
      success: (res) => {
        if (res.statusCode == 200) {
          wx.hideLoading();
          this.setData({
            rightList: res.data.data
          })
        }

      }
    })
  }
})

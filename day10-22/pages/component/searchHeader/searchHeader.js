// pages/component/searchHeader/searchHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: Boolean,
    category: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryIcon: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toIndexFn() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})

function requestApi(url, data = {}, method = 'get') {
  return new Promise((resole, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: "Content-type:Application/json",
      success: (res) => {
        resole(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}


module.exports = {
  requestApi
}

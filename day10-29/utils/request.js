

function requestApi(url, data = {}, method = 'get',) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      header: "content-type:application/json",
      data: data,
      success: (res) => {
        if (res.statusCode == 200) {
          resolve(res);
        }
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
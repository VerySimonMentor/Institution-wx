// app.js
App({
  onLaunch() {
    const tocken = wx.getStorageSync('loginTocken');
    wx.request({
      url: this.globalData.domain + '/wx/checkTocken?loginTocken=' + tocken,
      method: 'GET',
      success: function(res){
        if (res.data.state) {
          wx.redirectTo({
            url: '/pages/home/home?loginState=' + res.data.loginState,
          });
        } else {
          wx.redirectTo({
            url: '/pages/index/index',
          });
        }
      }
    })
  },
  globalData: {
    domain: 'https://spark.verysimon.com:9001',
  }
})

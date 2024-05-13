// app.js
App({
  onLaunch() {
    const tocken = wx.getStorageSync('tocken');
    wx.request({
      url: this.globalData.domain + '/wx/check?tocken=' + tocken,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log('success');
      },
      fail: function() {
        console.log('fail');
        
      },
      complete: function() {
        // complete
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: 'https://spark.verysimon.com:9001',
  }
})

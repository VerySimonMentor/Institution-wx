Page({
  data: {
    loginState: 0,
    phoneNumber: '',
    pageIndex: 4,
  },
  onLoad: function(options) {
    this.setData({
        loginState: options.loginState,
        phoneNumber: options.phoneNumber,
    });
  },
  onTapLogin(e) {
    wx.redirectTo({
      url: '/pages/index/index',
      success: function(res){
        // success
      },
    })
  },
})
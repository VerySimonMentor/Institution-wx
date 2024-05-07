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
  onTapHome(e) {
    this.setData({
      pageIndex: 1,
    });
  },
  onTapStudent(e) {
    this.setData({
      pageIndex: 2,
    });
  },
  onTapMessage(e) {
    this.setData({
      pageIndex: 3,
    });
  },
  onTapMy(e) {
    this.setData({
      pageIndex: 4,
    });
  },
})
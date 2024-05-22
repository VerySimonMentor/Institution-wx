Page({
  data: {
    loginState: 0,
    pageIndex: 4,
    noPassword: false,
    inputPassword: '',
    inputPasswordAgain: '',
    phoneNumber: '',
  },
  onLoad: function(options) {
    const app = getApp();
    this.setData({
        loginState: options.loginState,
    });
    if (this.data.loginState != 0) {
      const tocken = wx.getStorageSync('loginTocken');
      const that = this;
      wx.request({
        url: app.globalData.domain + '/wx/checkPassword?loginTocken=' + tocken,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(res){
          if (res.data.noPassword) {
            that.setData({
              noPassword: true,
            });
          } else {
            that.setData({
              noPassword: false,
              phoneNumber: res.data.phoneNumber,
            });
          }
        }
      });
    }
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
  onInputPassword(e) {
    this.setData({
      inputPassword: e.detail.value,
    });
  },
  onInputPasswordAgain(e) {
    this.setData({
      inputPasswordAgain: e.detail.value,
    });
  },
  onTapSetPassword(e) {
    if (this.data.inputPassword != this.data.inputPasswordAgain) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    const app = getApp();
    const tocken = wx.getStorageSync('loginTocken');
    const that = this;
    var md5 = require('../../utils/md5.js');
    var hashedPassword = md5(this.data.inputPassword);
    var data = {
      loginTocken: tocken,
      password: hashedPassword,
    }
    wx.request({
      url: app.globalData.domain + '/wx/initPassword',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
      success: function(res){
        if (res.data.state) {
          that.setData({
            noPassWord: false,
          });
          wx.redirectTo({
            url: '/pages/home/home?loginState=' + that.data.loginState,
            success: function(res){
              // success
            },
          });
        }
      }
    });
  },
  onTapResetPassword(e) {
    wx.navigateTo({
      url: '/pages/home/toolPages/password/password',
      success: function(res){
        // success
      },
      fail: function() {
        console.log('fail');
      },
    })
  },
  onTapQuitAccount(e) {
    wx.removeStorageSync('loginTocken');
    wx.redirectTo({
      url: '/pages/index/index',
      success: function(res){
        // success
      },
    });
  },
  onTapFeedback(e) {
    wx.navigateTo({
      url: '/pages/home/toolPages/feedback/feedback',
      success: function(res){
        // success
      },
    });
  },
  onTapContactUs(e) {
    wx.navigateTo({
      url: '/pages/home/toolPages/contactUs/contactUs',
      success: function(res){
        // success
      },
    });
  }
})
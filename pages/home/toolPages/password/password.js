Page({
  data: {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  },
  onInputOldPassword(e) {
    var md5 = require('../../../../utils/md5.js');
    var hashedOldPassword = md5(e.detail.value);
    this.setData({
      oldPassword: hashedOldPassword,
    });
  },
  onInputNewPassword(e) {
    var md5 = require('../../../../utils/md5.js');
    var hashedNewPassword = md5(e.detail.value);
    this.setData({
      newPassword: hashedNewPassword,
    });
  },
  onInputNewPasswordAgain(e) {
    var md5 = require('../../../../utils/md5.js');
    var hashedNewPasswordAgain = md5(e.detail.value);
    this.setData({
      newPasswordAgain: hashedNewPasswordAgain,
    });
  },
  onTapSetPassword(e) {
    if (this.data.newPassword != this.data.newPasswordAgain) {
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
    var data = {
      loginTocken: tocken,
      oldPassword: that.data.oldPassword,
      newPassword: that.data.newPassword,
    };
    wx.request({
      url: app.globalData.domain + '/wx/newPassword',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
      success: function(res){
        if (res.data.state) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
          });
          wx.navigateBack();
        } else {
          wx.showToast({
            title: '原密码错误',
            icon: 'none',
            duration: 2000,
          });
        }
      }
    });
  },
})
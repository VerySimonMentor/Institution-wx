// index.js

Page({
  data: {
    loginButton: 'login-button-disabled',
    isButtonDisabled: true,
    inputPhoneNumber: '',
    inputPassword: '',
  },
  onTapConfirm(e) {
    this.setData({
      isButtonDisabled: !this.data.isButtonDisabled,
    });
    if (this.data.isButtonDisabled) {
      this.setData({
        loginButton: 'login-button-disabled',
      });
    }
    else {
      this.setData({
        loginButton: 'login-button',
      });
    }
  },
  onTapLogin(e) {
    var data = {
      phoneNumber: this.data.inputPhoneNumber,
      password: this.data.inputPassword,
    };
    if (data.phoneNumber && data.password) {
      wx.request({
        url: 'http://81.70.163.28:9001/login', // 你的服务器地址
        method: 'POST',
        data: {
          phoneNumber: this.data.inputPhoneNumber,
          password: this.data.inputPassword,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
    } else {
      wx.showToast({
        title: '用户名或密码为空',
        icon: 'none',
        duration: 2000
      });
    }
  },
  onTapNotLogin(e) {
    console.log('not login');
  },
  onInputPhoneNumber(e) {
    this.setData({
      inputPhoneNumber: e.detail.value,
    });
  },
  onInputPassword(e) {
    this.setData({
      inputPassword: e.detail.value,
    });
  },
})

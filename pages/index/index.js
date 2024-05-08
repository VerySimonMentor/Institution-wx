// index.js

Page({
  data: {
    loginButton: 'login-button-disabled',
    isButtonDisabled: true,
    inputPhoneNumber: '',
    inputPassword: '',
    isFastLogin: 2,
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
        url: 'https://spark.verysimon.com:9001/', // 你的服务器地址
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
    console.log('onTapNotLogin');
    wx.redirectTo({
      url: '/pages/home/home?loginState=0&phoneNumber=',
      success: function(res){
        // success
      },
      fail: function(err) {
        console.log('fail', err);
      },
      complete: function() {
        // complete
      }
    });
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
  onTapInputLogin(e) {
    this.setData({
      isFastLogin: 1,
      isButtonDisabled: true,
    });
  },
  onTapFastLogin(e) {
    this.setData({
      isFastLogin: 2,
      isButtonDisabled: true,
    });
  },
  onGetPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    console.log(e)

    wx.redirectTo({
      url: '/pages/home/home?loginState=1&phoneNumber=',
      success: function(res){
        // success
      },
      fail: function(err) {
        console.log('fail', err);
      },
      complete: function() {
        // complete
      }
    });
  }
})

function requestLogin(data) {
  wx.request({
    url: 'https://spark.verysimon.com:9001/wx/login', // 你的服务器地址
    method: 'POST',
    data: JSON.stringify(data),
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      return res.loginLevel;
    }
  })
}

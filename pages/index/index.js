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
      loginCode: '',
    };
    if (data.phoneNumber && data.password) {
      wx.login({
        success: function(res){
          data.loginCode = res.code;
          wx.request({
            url: 'https://spark.verysimon.com:9001/wx/login', // 你的服务器地址
            method: 'POST',
            data: JSON.stringify(data),
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
            },
            fail (res) {
              console.log(res)
            }
          });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    } else {
      wx.showToast({
        title: '用户名或密码为空',
        icon: 'none',
        duration: 2000
      });
    }
  },
  onTapNotLogin(e) {
    wx.redirectTo({
      url: '/pages/home/home?loginState=0',
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
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://spark.verysimon.com:9001/wx/login?code=' + e.detail.code + "&loginCode=" + res.code, // 你的服务器地址
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            wx.setStorageSync('loginTocken', res.data.loginTocken);
            wx.redirectTo({
              url: '/pages/home/home?loginState=' + res.data.loginState,
            });
          },
          fail (res) {
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log('login fail', res);
      }
    });
  }
})

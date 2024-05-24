Page({
  data: {
    countryList: [],
    provinceList: [],
    schoolTypeList: [],
    selectedCountryIndex: 0,
    showFilterMenu: false,
  },
  onLoad: function (options) {
    const app = getApp();
    const loginTocken = wx.getStorageSync('loginTocken');
    const that = this;
    wx.request({
      url: app.globalData.domain + '/wx/getCountry?loginTocken=' + loginTocken,
      method: 'GET',
      success: function(res){
        that.setData({
          countryList: res.data.countryList,
        });
      }
    });
  },
  onTapCountry(e) {
    var countryListIndex = e.currentTarget.dataset.index;
    this.setData({
      selectedCountryIndex: countryListIndex,
    });
  },
  onConfirmSchoolName(e) {
    const schoolName = e.detail.value;
  },
  onTapFilterMenu(e) {
    this.setData({
      showFilterMenu: !this.data.showFilterMenu,
    });
  }
})
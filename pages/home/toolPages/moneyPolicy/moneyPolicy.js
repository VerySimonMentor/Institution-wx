Page({
  data: {
    countryList: [],
    provinceList: [],
    schoolTypeList: [],
    schoolList: [],
    selectedCountryIndex: 0,
    showFilterMenu: false,
    allProvinceMap: {},
    allSchoolTypeMap: {},
    selectedProvinceMap: {},
    selectedSchoolTypeMap: {},
    searchContent: '',
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
    this.onConfirmSchoolName({detail: {value: ''}});
  },
  onTapCountry(e) {
    var countryListIndex = e.currentTarget.dataset.index;
    this.setData({
      selectedCountryIndex: countryListIndex,
    });
  },
  onConfirmSchoolName(e) {
    const searchContent = e.detail.value;
    const app = getApp();
    const loginTocken = wx.getStorageSync('loginTocken');
    const that = this;
    wx.request({
      url: app.globalData.domain + '/wx/getCountryDetail?loginTocken=' + loginTocken + '&searchContent=' + searchContent + '&countryListIndex=' + this.data.selectedCountryIndex + '&selectedProvinceMap' + JSON.stringify(this.data.selectedProvinceMap) + '&selectedSchoolTypeMap' + JSON.stringify(this.data.selectedSchoolTypeMap),
      method: 'GET',
      success: function(res){
        that.setData({
          schoolList: res.data.countryDetail,
          schoolTypeList: res.data.schoolType,
          provinceList: res.data.province,
        });
      }
    });
    let allProvinceMap = {};
    let allSchoolTypeMap = {};
    for (let i = 0; i < this.data.provinceList.length; i++) {
      allProvinceMap[this.data.provinceList[i].provinceId] = false;
    }
    for (let i = 0; i < this.data.schoolTypeList.length; i++) {
      allSchoolTypeMap[this.data.schoolTypeList[i].schoolTypeId] = false;
    }
  },
  onTapFilterMenu(e) {
    this.setData({
      showFilterMenu: !this.data.showFilterMenu,
    });
  },
  onTapCancel(e) {
    this.setData({
      showFilterMenu: false,
    });
  },
  onTapConfirm(e) {
    this.setData({
      showFilterMenu: false,
    });
    this.onConfirmSchoolName({detail: {value: this.data.searchContent}});
  },
  onTapProvince(e) {
    var provinceListIndex = e.currentTarget.dataset.index;
    this.data.allProvinceMap[provinceListIndex] = !this.data.allProvinceMap[provinceListIndex];

    if (provinceListIndex in this.data.selectedProvinceMap) {
      delete this.data.selectedProvinceMap[provinceListIndex];
    } else {
      this.data.selectedProvinceMap[provinceListIndex] = true;
    }

    this.setData({
      selectedProvinceMap: this.data.selectedProvinceMap,
      allProvinceMap: this.data.allProvinceMap
    });
  },
  onTapSchoolType(e) {
    var schoolTypeListIndex = e.currentTarget.dataset.index;
    this.data.allSchoolTypeMap[schoolTypeListIndex] = !this.data.allSchoolTypeMap[schoolTypeListIndex];

    if (schoolTypeListIndex in this.data.selectedSchoolTypeMap) {
      delete this.data.selectedSchoolTypeMap[schoolTypeListIndex];
    } else {
      this.data.selectedSchoolTypeMap[schoolTypeListIndex] = true;
    }

    this.setData({
      selectedSchoolTypeMap: this.data.selectedSchoolTypeMap,
      allSchoolTypeMap: this.data.allSchoolTypeMap
    });
  },
  onInputSearchContent(e) {
    this.setData({
      searchContent: e.detail.value,
    });
  },
})
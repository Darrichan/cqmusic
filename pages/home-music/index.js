// pages/home-music/index.js
import {
  getBanners
} from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData();
  },
  // 事件处理函数
  handleSearchClick: function () {
    console.log('搜索框发生点击')
    wx.navigateTo({
      url: '../detail-search/index',
    })
  },
  // 获取页面数据
  getPageData: function () {
    getBanners().then(res => {
      this.setData({banners:res.data.banners})
    })
  },
  onUnload: function () {

  },

})
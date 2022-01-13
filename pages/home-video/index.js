// pages/home-video/index.js
import {
  getTopMV
} from '../../service/api_video'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopMVData(0, 10)

  },
  // 封装网络请求的方法
  async getTopMVData(offset, limit) {
    // 判断是否可以请求数据
    if (!this.data.hasMore && offset !== 0) return
    wx.showNavigationBarLoading();
    // 请求数据
    const res = await getTopMV(offset, limit)
    let newData = this.data.topMVs;
    if (offset === 0) {
      newData = res.data.data
    } else {
      newData = newData.concat(res.data.data)
    }
    // 设置数据
    this.setData({
      topMVs: newData
    })
    this.setData({
      hasMore: res.data.hasMore
    })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  // 封装按钮点击的方法
  handleVideoClick: function (event) {
    // 获取点击id
    const id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: '/pages/detail-video/index?id='+id
    })
  },
  // 其他生命周期
  onPullDownRefresh: async function () {
    await this.getTopMVData(0, 10)
  },
  onReachBottom: async function () {
    if (!this.data.hasMore) return
    await this.getTopMVData(this.data.topMVs.length, 10)
  }
})
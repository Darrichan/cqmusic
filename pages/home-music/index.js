// pages/home-music/index.js
import {
  getBanners, getSongMenu
} from '../../service/api_music'
import queryRect from '../../utils/selector-rect'
import throttle from '../../utils/throttle'
import {rankingStore} from '../../store/ranking-store'

const throttleQueryRect = throttle(queryRect,100)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSongs:[],
    recommendSongMenu:[],
    hotSongMenu:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面数据
    this.getPageData();

    // 发起共享数据的请求
    rankingStore.dispatch('getRankingDataAction')

    // 从store中获取数据
    rankingStore.onState('hotRanking',res=>{
      if(!res.tracks) return
      const recommendSongs = res.tracks.slice(0,5)
      this.setData({recommendSongs})
    })
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
      this.setData({
        banners: res.data.banners
      })
    })

    getSongMenu().then(res=>{
      this.setData({hotSongMenu:res.data.playlists})
    })

    getSongMenu("华语").then(res=>{
      this.setData({recommendSongMenu:res.data.playlists})
    })
  },
  // 处理轮播图图片加载完成函数
  handleSwiperImageLoaded: function () {
    // 获取图片高度即可（如何获取组件的高度）
    throttleQueryRect('.swiper-image').then(res=>{
      const rect = res[0]
      this.setData({swiperHeight:rect.height})
    })
    
  },
  onUnload: function () {

  },

})
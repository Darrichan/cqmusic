// pages/home-music/index.js
import {
  getBanners,
  getSongMenu
} from '../../service/api_music'
import queryRect from '../../utils/selector-rect'
import throttle from '../../utils/throttle'
import {
  rankingStore,rankingMap
} from '../../store/ranking-store'

const throttleQueryRect = throttle(queryRect, 100)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSongs: [],
    recommendSongMenu: [],
    hotSongMenu: [],
    rankings: {
      0: {},
      2: {},
      3: {}
    }
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
    rankingStore.onState('hotRanking', res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 5)
      this.setData({
        recommendSongs
      })
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))
  },
  // 事件处理函数
  handleSearchClick: function () {
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

    getSongMenu().then(res => {
      this.setData({
        hotSongMenu: res.data.playlists
      })
    })

    getSongMenu("华语").then(res => {
      this.setData({
        recommendSongMenu: res.data.playlists
      })
    })
  },

  // 处理轮播图图片加载完成函数
  handleSwiperImageLoaded: function () {
    // 获取图片高度即可（如何获取组件的高度）
    throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({
        swiperHeight: rect.height
      })
    })

  },

  handleMoreClick: function () {
   this.navigateToDetailSongsPage('hotRanking');
  },

  handleRankingItemClick: function (event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx];
    this.navigateToDetailSongsPage(rankingName);
  },

  navigateToDetailSongsPage: function(rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },
  onUnload: function () {},
  getRankingHandler: function (idx) {
    return res => {
      if (Object.keys(res).length === 0) return
      const name = res.name;
      const playCount = res.playCount;
      const coverImgUrl = res.coverImgUrl;
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {
        name,
        coverImgUrl,
        songList,
        playCount
      }
      const newRankings = {
        ...this.data.rankings,
        [idx]: rankingObj
      }
      this.setData({
        rankings: newRankings
      })
    }
  }
})
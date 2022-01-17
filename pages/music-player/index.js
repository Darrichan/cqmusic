// pages/music-player/index.js
import {
        getSongDetail,
        getSongLyric
} from '../../service/api_player'
import {
        audioContext,
        playerStore
} from '../../store/index'
const playModeNames = ['order', 'repeat', 'random'];
Page({

        /**
         * 页面的初始数据
         */
        data: {
                id: 0,

                currentSong: {},
                durationTime: 0,
                lyricInfo: [],

                currentTime: 0,
                currentLyricIndex: 0,
                currentLyricText: '',

                currentPage: 0,
                contentHeight: 0,
                durationTime: 0,
                sliderValue: 0,
                isSliderChanging: false,
                lyricInfo: '',
                lyricScrollTop: 0,

                playModeIndex: 0,
                playModeName: 'order',
                isPlaying: false,
                playingName: 'pause'
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const id = options.id
                this.setData({
                        id
                })
                // 2.根据id获取歌曲信息
                this.setupPlayerStoreListener()
                // 3.动态计算内容高度
                const globalData = getApp().globalData
                const screenHeight = globalData.screenHeight
                const statusBarHeight = globalData.statusBarHeight
                const navBarHeight = globalData.navBarHeight
                const contentHeight = screenHeight - statusBarHeight - navBarHeight
                this.setData({
                        contentHeight,
                })

                this.setupAudioContextListener();
        },

        // 处理滑动窗口
        handleSwiperChange: function (event) {
                const detail = event.detail.current;
                this.setData({
                        currentPage: detail,
                })
        },
        setupAudioContextListener: function () {

        },
        handleSliderChange: function (event) {
                // 获取slider的值
                const value = event.detail.value
                // 2.想要播放的时间
                const currentTime = this.data.durationTime * value / 100000
                // 3.设置播放器的播放currentTime的时间
                audioContext.pause()
                audioContext.seek(currentTime)
                // 4.记录最新的sliderValue
                this.setData({
                        sliderValue: value,
                        isSliderChanging: false

                })
        },
        handleSliderChanging: function (event) {
                const current = event.detail.value;
                const currentTime = this.data.durationTime * current / 100
                this.setData({
                        isSliderChanging: true,
                        currentTime
                })
        },

        handleBackBtnClick: function () {
                wx.navigateBack()
        },
        handleModeBtnClick: function () {
                let playModeIndex = this.data.playModeIndex + 1;
                if (playModeIndex === 3) {
                        playModeIndex = 0;
                        playerStore.setState('playModeIndex', playModeIndex)
                        return
                }
                playerStore.setState('playModeIndex', playModeIndex)
        },
        handlePlayBtnClick: function () {
                playerStore.dispatch("changeMusicPlayStatusAction")
        },
        // 数据的监听
        setupPlayerStoreListener: function () {
                // 监听"currentSong", "durationTime", "lyricInfo"三个数据的变换
                playerStore.onStates(["currentSong", "durationTime", "lyricInfo"], ({
                        currentSong,
                        durationTime,
                        lyricInfo
                }) => {
                        if (currentSong) this.setData({
                                currentSong
                        })
                        if (durationTime) this.setData({
                                durationTime
                        })
                        if (lyricInfo) this.setData({
                                lyricInfo
                        })
                })
                playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
                        currentTime,
                        currentLyricIndex,
                        currentLyricText
                }) => {
                        // 时间变换
                        if (currentTime && !this.data.isSliderChanging) {
                                const sliderValue = currentTime / this.data.durationTime * 100
                                this.setData({
                                        currentTime,
                                        sliderValue
                                })
                        }
                        // 歌词变换
                        if (currentLyricIndex) {
                                this.setData({
                                        currentLyricIndex,
                                        lyricScrollTop: currentLyricIndex * 35
                                })
                        }
                        // 滑块处歌词
                        if (currentLyricText) {
                                this.setData({
                                        currentLyricText
                                })
                        }
                })
                playerStore.onStates(["playModeIndex", "isPlaying"], ({
                        playModeIndex,
                        isPlaying
                }) => {
                        if (playModeIndex) {
                                this.setData({
                                        playModeIndex: playModeIndex,
                                        playModeName: playModeNames[playModeIndex],
                                })
                        }
                        if (isPlaying !== undefined) {
                                this.setData({
                                        isPlaying,
                                        playingName: isPlaying ? "pause" : "resume"
                                })
                        }

                })
        },

        // 监听音乐按钮播放模式
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

})
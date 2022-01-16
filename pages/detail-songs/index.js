import {
        rankingStore
} from '../../store/index'
import {
        getSongMenuDetail
} from '../../service/api_music'
// pages/detail-songs/index.js
Page({
        data: {
                type: "",
                ranking: "",
                songInfo: {},
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const type = options.type;
                this.setData({type})
                if (type == 'rank') {
                        const ranking = options.ranking;
                        this.setData({
                                ranking
                        })
                        // 1.获取数据
                        rankingStore.onState(ranking, this.getRankingDataHanlder)
                } else if (type == 'menu') {
                        const id = options.id
                        console.log(id)
                        getSongMenuDetail(id).then(res => {
                                this.setData({
                                        songInfo: res.data.playlist
                                })
                        })
                }

        },

        onUnload: function () {
                if (this.data.ranking) {
                        rankingStore.offState(this.data.ranking, this.getRankingDataHanlder)

                }
        },
        getRankingDataHanlder: function (res) {
                console.log(res)
                this.setData({
                        songInfo: res
                })
        }
})
import {
        getMVDetail,
        getMVRelate,
        getMVUrl
} from '../../service/api_video'
// pages/detail-video/index.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                MVUrl: {},
                MVDetail: {},
                MVRelate: {}
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const id = options.id;
                console.log(id)
                this.getPageData(id)
        },
        getPageData: function (id) {
                // 1. 请求播放地址
                getMVUrl(id).then(res => {
                        this.setData({
                                MVUrl: res.data.data
                        })
                })
                // 2. 请求视频信息
                getMVDetail(id).then(res => {
                        this.setData({
                                MVDetail: res.data.data
                        })
                })
                // 3. 请求相关视频
                getMVRelate(id).then(res => {
                        this.setData({
                                MVRelate: res.data.data
                        })
                })
        },
        MVRelateClick:function(event){
          console.log(event)      
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})
// pages/detail-search/index.js
import {
        getSearchHot,
        getSearchSuggest,
        getSearchResult
} from '../../service/api-search'

import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/stringToNodes'
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)
Page({

        /**
         * 页面的初始数据
         */
        data: {
                hotKeyWords: [],
                suggestSongs: [],
                suggestSongsNodes: [],
                resultSongs: [],
                searchValue: ''
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                this.getPageData()
        },
        getPageData: function () {
                getSearchHot().then(res => {
                        this.setData({
                                hotKeyWords: res.data.result.hots
                        })
                })
        },
        // 搜索框输入改变
        handleSearchChange: function (event) {
                const searchValue = event.detail
                this.setData({
                        searchValue
                })
                if (!searchValue.length) {
                        this.setData({
                                suggestSongs: [],
                                resultSongs:[]
                        })
                        debounceGetSearchSuggest.cancel()
                        return;
                }
                // 4.根据关键字进行搜索
                debounceGetSearchSuggest(searchValue).then(res => {
                        // 1.获取建议的关键字歌曲
                        const suggestSongs = res.data.result.allMatch
                        this.setData({
                                suggestSongs
                        })

                        // 2.转成nodes节点
                        if(!suggestSongs) return
                        const suggestKeywords = suggestSongs.map(item => item.keyword)
                        const suggestSongsNodes = []
                        for (const keyword of suggestKeywords) {
                                const nodes = stringToNodes(keyword, searchValue)
                                suggestSongsNodes.push(nodes)
                        }
                        this.setData({
                                suggestSongsNodes
                        })
                })
        },
        handleSearchAction: function () {
                const searchValue = this.data.searchValue;
                getSearchResult(searchValue).then(res => {
                        this.setData({
                                resultSongs: res.data.result.songs
                        })
                })
        },
        handleKeywordItemClick(event) {
                const keyword = event.currentTarget.dataset.keyword;

                // 将关键字设置到搜索值中
                this.setData({
                        searchValue: keyword
                })

                // 发送网络请求
                this.handleSearchAction();
        }, 
        onUnload: function () {

        },
})
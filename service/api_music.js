import cqrequest from './index'
export function getBanners() {
        return cqrequest.get("banner", {
                type: 2
        })
}
export function getRankingData(idx) {
        return cqrequest.get("top/list", {
                idx
        })
}
// cat -> category 类别
export function getSongMenu(cat = "全部", limit = 10, offset = 0) {
        return cqrequest.get("top/playlist", {
                cat,
                limit,
                offset
        })
}
export function getSongMenuDetail(id) {
        return cqrequest.get("playlist/detail/dynamic", {
                id
        })
}
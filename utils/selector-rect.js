// 用于获取轮播图的高度
export default function queryRect(selector){
        return new Promise((resolve)=>{
                const query = wx.createSelectorQuery()
                query.select(selector).boundingClientRect()
                query.exec(res => {
                  resolve(res)
                })
        })
        
}
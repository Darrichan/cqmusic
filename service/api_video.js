import cqrequest from './index'
export function getTopMV(offset,limit){
        return cqrequest.get('top/mv',{offset,limit})
}
export function getMVUrl(id){
        return cqrequest.get('mv/url',{id})
}
export function getMVDetail(mvid){
        return cqrequest.get('mv/detail',{mvid})
}
export function getMVRelate(id){
        return cqrequest.get('related/allvideo',{id})
}
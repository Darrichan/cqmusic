import cqrequest from './index'
export function getBanners() {
        return cqrequest.get("banner", {
                type: 2
        })
}
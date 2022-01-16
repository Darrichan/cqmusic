import cqRequest from './index'
export function getSearchHot() {
  return cqRequest.get("search/hot")
}
export function getSearchSuggest(keywords) {
  return cqRequest.get("search/suggest", {
    keywords,
    type: "mobile"
  })
}
export function getSearchResult(keywords) {
  return cqRequest.get("search", {
    keywords
  })
}

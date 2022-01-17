import cqRequest from './index'

export function getSongDetail(ids) {
  return cqRequest.get("song/detail", {
    ids
  })
}

export function getSongLyric(id) {
  return cqRequest.get("lyric", {
    id
  })
}


const baseUrl = 'http://3.chen7.xyz:3000/'
class CQRequset {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: method,
        data: params,
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      })
    })
  }
  get(url, params) {
    return this.request(url, 'get', params)
  }
  post(url, data) {
    return this.request(url, 'post', data)
  }
}
const cqrequest = new CQRequset()
export default cqrequest;
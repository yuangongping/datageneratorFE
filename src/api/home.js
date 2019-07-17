import request from '../utils/request.js';
const querystring = require('querystring')

export function getFastConfigs() {
  return new Promise((resolve, reject) => {
    request({
      url: '/getfastconfigs',
      method: 'get',
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
import request from '../utils/request.js';
const querystring = require('querystring')

export function apiAddCase(params) {
    return new Promise((resolve, reject) => {
      request({
        url: '/addcase',
        method: 'post',
        data: querystring.stringify({
          sharer: params.sharer,
          table_name: params.table_name,
          quote_num: params.quote_num,
          like_num: params.like_num,
          configs: JSON.stringify(params.configs)
        })
      }).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    })
}


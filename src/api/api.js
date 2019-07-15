import request from '../utils/request.js';
const querystring = require('querystring')

export function apiInsertRecord(params) {
    return new Promise((resolve, reject) => {
      request({
        url: '/addrecord',
        method: 'post',
        data: querystring.stringify({
            nick_name: params.nick_name,
            table_name: params.table_name,
            configs: JSON.stringify(params.config)
          })
      }).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    })
}


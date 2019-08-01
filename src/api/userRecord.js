import request from '../utils/request.js';
const querystring = require('querystring')
// 回复意见api
export function addUserRecord(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      request({
        url: '/adduserrecord',
        method: 'post',
        data: querystring.stringify({
            configs: params.configs,
            export_data_number: params.export_data_number,
            export_file_type: params.export_file_type,
            export_filename: params.export_filename
        })
      }).then((res) => {
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    })
  }